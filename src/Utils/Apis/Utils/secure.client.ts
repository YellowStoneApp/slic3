/**
 * All authenticated API calls should be made through this client
 * No front end code should make calls through this.
 *
 * Only *.service.ts modules should make calls through this.
 */

import { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { logService } from '../logging.service';
import { standardClient } from './standard.client';

const getAccessToken = async (): Promise<string> => {
    try {
        const authenticated: CognitoUser | any = await Auth.currentAuthenticatedUser();
        if (authenticated instanceof CognitoUser) {
            const token = authenticated.getSignInUserSession()?.getAccessToken().getJwtToken();
            if (token !== undefined) {
                return token;
            }
            throw new Error('No valid access token');
        }
        throw new Error('No valid user logged in');
    } catch (error) {
        logService.error(error.message);
        throw error;
    }
};

/**
 * POST Request to any service using the auth token granted to customer
 * @param baseUrl
 * @param api
 * @param payload
 * @returns
 */
const post = async (baseUrl: string, api: string, payload: any) => {
    const authToken = await getAccessToken();
    if (authToken) {
        return await standardClient.post(baseUrl, api, payload, {
            headers: {
                Authorization: 'Bearer ' + authToken,
            },
        });
    } else {
        logService.error('No Auth token present');
        throw new Error('No Auth token present. You must login first.');
    }
};

/**
 * Get Request to any service using the auth token granted to customer
 * @param baseUrl
 * @param api
 * @param data
 * @returns
 */
const get = async (baseUrl: string, api: string, data?: any) => {
    const authToken = await getAccessToken();
    if (authToken) {
        // !!! DONOT DO THIS - do not set global headers on axios. S3 Storage uses axios and if you set global properties on axios
        // you will break the storage module!
        //axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;
        return await standardClient.get(baseUrl, api, data, {
            headers: {
                Authorization: 'Bearer ' + authToken,
            },
        });
    } else {
        logService.error('No Auth token present');
        throw new Error('No Auth token present. You must login first.');
    }
};

export const secureClient = {
    post,
    get,
};
