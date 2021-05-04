/**
 * All authenticated API calls should be made through this client
 * No front end code should make calls through this.
 *
 * Only *.service.ts modules should make calls through this.
 */

import axios from "axios";
import jwtDecode from "jwt-decode";
import { AUTH_USER_ACCESS_TOKEN_KEY } from "../../constants";
import { logService } from "../logging.service";
import { apiErrorHandlingWithLogs, requestType } from "./call.wrapper";

const post = async (baseUrl: string, api: string, payload: any) => {
  const authToken = localStorage.getItem(AUTH_USER_ACCESS_TOKEN_KEY);
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
    console.log(response, "get");
    return response;
  } else {
    logService.error("No Auth token present");
    throw new Error("No Auth token present. You must login first.");
  }
};

const get = async (baseUrl: string, api: string, data?: any) => {
  const authToken = localStorage.getItem(AUTH_USER_ACCESS_TOKEN_KEY);
  if (authToken) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + authToken;
    let params = {};
    if (data) {
      params = { params: data };
    }
    const response = await apiErrorHandlingWithLogs(
      async () => {
        return await axios.get(`${baseUrl}${api}`, params);
      },
      api,
      baseUrl,
      requestType.get
    );
    console.log(response, "get");
    return response;
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
