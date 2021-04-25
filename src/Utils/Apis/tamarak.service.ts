import { apiErrorHandlingWithLogs } from "./Utils/call.wrapper";
import axios from "axios";
import { logService } from "./logging.service";
import { secureClient } from "./Utils/secure.client";

const url = "http://localhost:5100";

const dummyCall = async () => {
  const response = await apiErrorHandlingWithLogs(async () => {
    return await axios.get(`${url}/api/dummy`);
  }, "/api/dummy");
  console.log(response);
};

const getShouts = async () => {
  const response = await secureClient.get(url, "/api/shout");
  console.log(response, "tam");
  return response.data;
};

export const tamarakService = {
  dummyCall,
  getShouts,
};
