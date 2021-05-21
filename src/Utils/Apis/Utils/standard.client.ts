import axios from "axios";
import { apiErrorHandlingWithLogs, requestType } from "./call.wrapper";

const get = async (baseUrl: string, api: string, data?: any) => {
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
};

export const standardClient = {
  get,
};
