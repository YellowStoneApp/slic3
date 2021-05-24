/*  All API calls to the auth module need to go through this code. Here we explicitly track success / failues.

Error's that occur will bubble up to the application level. It it the callers responsibility to catch these errors and 
deliver the right customer experience based on the error.

This module with throw an error if any failures occur. This module could be smarter about the types of errors returned but for now
we just return the error to front end and allow front end decide how alert the user that something went wrong.

If the response gets used these function calls need to sanitize the response and ensure a defined response 
Type or throw an error if that response type can't be satisfied. 

There should not be any need to manage tokens outside of this module
*/

import Auth, { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { ISignUpResult } from 'amazon-cognito-identity-js';
/** App constants */
import { AUTH_USER_ACCESS_TOKEN_KEY } from '../../Utils/constants';
import { apiErrorHandlingWithLogs } from './Utils/call.wrapper';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { logService } from './logging.service';
import { tamarakService } from './tamarak.service';

/**
 * Used in signing up the customer with password / email flow.
 */
export interface iCustomerSignUp {
    name: string;
    avatar?: string;
    email: string;
    bio?: string;
}

/**
 * This is the customer that's now registerd in our system. We have access to their identity key.
 */
export interface iRegisteredCustomer extends iCustomerSignUp {
    identityKey: string;
}

/**
 * This is a public customer. There's no information here that we don't want others to have like email and such.
 * This should be the type that's used for customers that aren't logged in.n
 */
export interface iCustomerPublic {
    avatar?: string;
    name: string;
    identityKey: string;
    bio?: string;
}

export const defaultAvatar = 'https://image.freepik.com/free-vector/cute-teddy-bear-waving-hand-cartoon-icon-illustration_138676-2714.jpg';

const login = async (email: string, password: string): Promise<iRegisteredCustomer> => {
    const response = await apiErrorHandlingWithLogs(async () => {
        return await Auth.signIn(email, password);
    }, 'Auth.signIn');
    if (response && response instanceof CognitoUser) {
        const idPayload = response.getSignInUserSession()?.getIdToken().payload;
        if (idPayload !== undefined) {
            const avatar = extractAvatar(idPayload);
            const customer = {
                name: idPayload.name,
                avatar: avatar,
                email: idPayload.email,
                identityKey: idPayload.sub,
            };

            // we need to register the customer with tamarak before we can really load their profile. See tamarakService comments about why i did dis...
            await tamarakService.registerCustomer(customer);
            // this is main entry point for authorized customer info.
            return await getCurrentAuthCustomer();
        }
    }
    logService.error(`No access token in response. ${response}`);
    throw new Error('No access token in response');
};

const signUp = async (firstName: string, lastName: string, email: string, password: string) => {
    const response: ISignUpResult = await apiErrorHandlingWithLogs(async () => {
        return await Auth.signUp({
            username: email,
            password: password,
            attributes: {
                email: email,
                name: firstName + ' ' + lastName,
                family_name: lastName,
            },
        });
    }, 'Auth.signUp');
    return response;
};

/**
 * This should be used to access if the customer is authorized and to get the authorized customer profile information.
 *
 * this makes a call to tamarak service to get customer profile. Tamarak is source of truth for customer profile information.
 */
const getCurrentAuthCustomer = async (): Promise<iRegisteredCustomer> => {
    const cust = await Auth.currentAuthenticatedUser();
    console.log(cust);
    if (cust !== undefined && cust instanceof CognitoUser) {
        const idPayload = cust.getSignInUserSession()?.getIdToken().payload;
        console.log(idPayload);
        if (idPayload !== undefined) {
            const customerId = idPayload.sub;
            return await tamarakService.getRegisteredCustomer(customerId);
        }
    }
    throw new Error('Could not load authenticated user');
};

const loginWithFacebook = async () => {
    return await apiErrorHandlingWithLogs(async () => {
        return Auth.federatedSignIn({
            provider: CognitoHostedUIIdentityProvider.Facebook,
        });
    }, 'Auth.federatedSignIn');
};

const confirmSignup = async (email: string, validationCode: string) => {
    return await apiErrorHandlingWithLogs(async () => {
        return await Auth.confirmSignUp(email, validationCode);
    }, 'Auth.confirmSignUp');
};

const forgotPassword = async (email: string) => {
    return await apiErrorHandlingWithLogs(async () => {
        return await Auth.forgotPassword(email).then((data) => {});
    }, 'Auth.forgotPassword');
};

const signOut = async () => {
    const response = await apiErrorHandlingWithLogs(async () => {
        return await Auth.signOut();
    }, 'Auth.signOut');

    localStorage.removeItem(AUTH_USER_ACCESS_TOKEN_KEY);
    return response;
};

const resetPassword = async (email: string, verificationCode: string, newPassword: string) => {
    return await apiErrorHandlingWithLogs(async () => {
        return await Auth.forgotPasswordSubmit(email, verificationCode, newPassword);
    }, 'Auth.forgotPasswordSubmit');
};

export const identityService = {
    login,
    signUp,
    confirmSignup,
    forgotPassword,
    resetPassword,
    signOut,
    loginWithFacebook,
    getCurrentCustomer: getCurrentAuthCustomer,
};

/**
 *  Internal Methods below.
 */

const extractAvatar = (payload: any): string => {
    const blob = payload.picture;
    if (blob) {
        const obj = JSON.parse(blob);
        if (obj.data.url) {
            return obj.data.url;
        }
    }
    logService.error('Payload did not contain a url. ' + payload);
    return defaultAvatar;
};
