/**
 * Default behavior in this module. If something goes wrong this code should throw an error. The caller is responsible for bubbling this up to the user however they see fit.
 */

import { apiErrorHandlingWithLogs } from "./Utils/call.wrapper";
import axios from "axios";
import { logService } from "./logging.service";
import { secureClient } from "./Utils/secure.client";
import { linkPreview } from "./Utils/gift.registry";
import {
  iCustomer,
  iCustomerPublic,
  iRegisteredCustomer,
} from "./Identity.service";

const url = process.env.REACT_APP_MAIN_SERVICE_URL;
if (!url) {
  throw new Error("Cannot load url from env variable");
}

export interface iGift {
  url: string;
  description: string;
  image: string;
  price: number;
  title: string;
  affiliateUrl?: string;
  id: number;
}

const dummyCall = async () => {
  const response = await apiErrorHandlingWithLogs(async () => {
    return await axios.get(`${url}/api/dummy`);
  }, "/api/dummy");
  console.log(response);
};

const getGifts = async (customerId: string): Promise<iGift[]> => {
  const response = await secureClient.get(url, "/api/giftpublic", {
    customerId: customerId,
  });
  return response.data;
};

const registerGift = async (giftUrl: string, preview: linkPreview) => {
  console.log(preview, giftUrl);
  const response = await secureClient.post(url, "/api/gift/register", {
    url: giftUrl,
    title: preview.title,
    image: preview.image,
    description: preview.description,
  });

  return response.data;
};

const registerCustomer = async (
  customer: iCustomer
): Promise<iRegisteredCustomer> => {
  const response = await secureClient.post(url, "/api/customer/register", {
    name: customer.name,
    email: customer.email,
    avatar: customer.avatar,
  });
  validateResponse(response.data);
  return response.data;
};

const getCustomerPublicProfile = async (
  customerId: string
): Promise<iCustomerPublic> => {
  const response = await secureClient.get(url, "/api/customerpublic", {
    customerId: customerId,
  });
  validateResponse(response);

  const customer: iCustomerPublic = response.data;
  if (!customer.avatar || !customer.name || !customer.identityKey) {
    logService.error(`Invalid response from server. Got ${response}`);
    throw new Error("Invalid response.");
  }

  return customer;
};

const getProfile = async (username: string): Promise<iCustomerPublic> => {
  const response = await secureClient.get(url, "/api/profile/user", {
    username,
  });
  validateResponse(response);

  const user: iCustomerPublic = response.data;
  if (!user.avatar || !user.name || !user.identityKey) {
    logService.error(`Invalid response from server. Got ${response}`);
    throw new Error("Invalid response.");
  }

  return user;
};

/**
 * This is meant to check the response for any failure codes that come back from MainService. I'm not 100% on this if I like it or not.
 *
 * But say we upload data to main service and what we sent is invalid. For instance a user is refistering and they picked a username already in existence. What do you do?
 *
 * It's not the server's fault. This shouldn't be a 500 error code inface we need the server to tell us something is wrong but the user can fix it.
 * If something like this happens we need to validate the response here. If we get an error code in the responseType then we know something went wrong in the server that the
 * user can and needs to fix like picking a different user name.
 *
 * Here we throw an error with this message and we let the calling code take responsibility for determining how to show the user this.
 * @param response
 */
const validateResponse = (response: any) => {
  // responseType === 0 when there's a successful result
  if (response.responseType && response.responseType !== 0) {
    logService.error(
      `Server threw invalid response ${JSON.stringify(response)}`
    );
    throw new Error(response.message ?? "Got broken response from server");
  }
};

export const tamarakService = {
  getCustomerPublicProfile,
  dummyCall,
  getGifts,
  registerCustomer,
  getProfile,
  registerGift,
};
