/**
 * All authenticated API calls should be made through this client
 */

import axios from "axios";
import { AUTH_USER_ACCESS_TOKEN_KEY } from "../../constants";
import { logService } from "../logging.service";
import { apiErrorHandlingWithLogs, requestType } from "./call.wrapper";

const post = async (baseUrl: string, api: string, payload: any) => {};

const get = async (baseUrl: string, api: string) => {
  const authToken = localStorage.getItem(AUTH_USER_ACCESS_TOKEN_KEY);
  if (authToken) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + authToken;
    const response = await apiErrorHandlingWithLogs(
      async () => {
        return await axios.get(`${baseUrl}${api}`);
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

const upload = async () => {};

export const secureClient = {
  post,
  get,
  upload,
};
