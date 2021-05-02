/*  All API calls to the auth module need to go through this code. Here we explicitly track success / failues.

Error's that occur will bubble up to the application level. It it the callers responsibility to catch these errors and 
deliver the right customer experience based on the error.

This module with throw an error if any failures occur. This module could be smarter about the types of errors returned but for now
we just return the error to front end and allow front end decide how alert the user that something went wrong.

If the response gets used these function calls need to sanitize the response and ensure a defined response 
Type or throw an error if that response type can't be satisfied. 

There should not be any need to manage tokens outside of this module
*/

import { Auth } from "aws-amplify";
import { ISignUpResult } from "amazon-cognito-identity-js";
/** App constants */
import { AUTH_USER_ACCESS_TOKEN_KEY } from "../../Utils/constants";
import { apiErrorHandlingWithLogs } from "./Utils/call.wrapper";

import { logService } from "./logging.service";
import { tamarakService } from "./tamarak.service";

const login = async (email: string, password: string) => {
  const response = await apiErrorHandlingWithLogs(async () => {
    return await Auth.signIn(email, password);
  }, "Auth.signIn");
  if (response?.signInUserSession?.accessToken?.jwtToken) {
    localStorage.setItem(
      AUTH_USER_ACCESS_TOKEN_KEY,
      response.signInUserSession.accessToken.jwtToken
    );
  } else {
    logService.error(`No access token in response. ${response}`);
    throw new Error("No access token in response");
  }
};

const signUp = async (username: string, password: string) => {
  const response: ISignUpResult = await apiErrorHandlingWithLogs(async () => {
    return await Auth.signUp({
      username: username,
      password: password,
      attributes: {
        email: username,
      },
    });
  }, "Auth.signUp");
  return response;
};

const confirmSignup = async (email: string, validationCode: string) => {
  const response = await apiErrorHandlingWithLogs(async () => {
    return await Auth.confirmSignUp(email, validationCode);
  }, "Auth.confirmSignUp");
};

const forgotPassword = async (email: string) => {
  return await apiErrorHandlingWithLogs(async () => {
    return await Auth.forgotPassword(email).then((data) => {});
  }, "Auth.forgotPassword");
};

const signOut = async () => {
  const response = await apiErrorHandlingWithLogs(async () => {
    return await Auth.signOut();
  }, "Auth.signOut");

  localStorage.removeItem(AUTH_USER_ACCESS_TOKEN_KEY);
  return response;
};

const resetPassword = async (
  email: string,
  verificationCode: string,
  newPassword: string
) => {
  return await apiErrorHandlingWithLogs(async () => {
    return await Auth.forgotPasswordSubmit(
      email,
      verificationCode,
      newPassword
    );
  }, "Auth.forgotPasswordSubmit");
};

export const identityService = {
  login,
  signUp,
  confirmSignup,
  forgotPassword,
  resetPassword,
  signOut,
};

/**
 *  Internal Methods below.
 */
