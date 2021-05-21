/**
 * All authenticated API calls should be made through this client
 * No front end code should make calls through this.
 *
 * Only *.service.ts modules should make calls through this.
 */

import { Auth } from "aws-amplify";
import { CognitoUser } from "amazon-cognito-identity-js";
import axios from "axios";
import { AUTH_USER_ACCESS_TOKEN_KEY } from "../../constants";
import { logService } from "../logging.service";
import { apiErrorHandlingWithLogs, requestType } from "./call.wrapper";
import { standardClient } from "./standard.client";

const getAccessToken = async (): Promise<string> => {
  try {
    const authenticated: CognitoUser | any =
      await Auth.currentAuthenticatedUser();
    if (authenticated instanceof CognitoUser) {
      const token = authenticated
        .getSignInUserSession()
        ?.getAccessToken()
        .getJwtToken();
      if (token !== undefined) {
        return token;
      }
      throw new Error("No valid access token");
    }
    throw new Error("No valid user logged in");
  } catch (error) {
    logService.error(error.message);
    throw error;
  }
};

const post = async (baseUrl: string, api: string, payload: any) => {
  const authToken = await getAccessToken();
  if (authToken) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + authToken;
    const response = await apiErrorHandlingWithLogs(
      async () => {
        return await axios.post(`${baseUrl}${api}`, payload);
      },
      api,
      baseUrl,
      requestType.post
    );
    console.log(response, "post");
    return response;
  } else {
    logService.error("No Auth token present");
    throw new Error("No Auth token present. You must login first.");
  }
};

const get = async (baseUrl: string, api: string, data?: any) => {
  const authToken = await getAccessToken();
  if (authToken) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + authToken;
    return await standardClient.get(baseUrl, api, data);
  } else {
    logService.error("No Auth token present");
    throw new Error("No Auth token present in storage");
  }
};

/**
 *
 * @param baseUrl
 * @param api
 * @param file
 * @returns
 */
const upload = async (
  baseUrl: string,
  api: string,
  file: File,
  name: string
) => {
  const authToken = localStorage.getItem(AUTH_USER_ACCESS_TOKEN_KEY);
  if (authToken) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + authToken;
    const formData = new FormData();

    formData.append(name, file, file.name);

    const response = await apiErrorHandlingWithLogs(
      async () => {
        return await axios.post(`${baseUrl}${api}`, formData);
      },
      api,
      baseUrl,
      requestType.post
    );
    return response;
  } else {
    logService.error("No Auth token present");
    throw new Error("No Auth token present. You must log in to upload a file.");
  }
};

export const secureClient = {
  post,
  get,
  upload,
};
