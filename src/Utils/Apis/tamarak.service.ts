/**
 * Default behavior in this module. If something goes wrong this code should throw an error. The caller is responsible for bubbling this up to the user however they see fit.
 */

import { apiErrorHandlingWithLogs } from "./Utils/call.wrapper";
import axios from "axios";
import { logService } from "./logging.service";
import { secureClient } from "./Utils/secure.client";
import { linkPreview } from "./Utils/gift.registry";

const url = process.env.REACT_APP_MAIN_SERVICE_URL;
if (!url) {
  throw new Error("Cannot load url from env variable");
}

export interface iUser {
  avatar: string;
  userName: string;
  id: number;
  identityKey: string;
}

export interface iGift {
  url: string;
  id: number;
}

const dummyCall = async () => {
  const response = await apiErrorHandlingWithLogs(async () => {
    return await axios.get(`${url}/api/dummy`);
  }, "/api/dummy");
  console.log(response);
};

const getGifts = async (): Promise<iGift[]> => {
  const response = await secureClient.get(url, "/api/shout");
  return response.data;
};

const getPostsFromUser = async (id: number): Promise<iGift[]> => {
  const response = await secureClient.get(url, "/api/shout/postsbyuser", {
    userId: id,
  });
  return response.data;
};

const registerGift = async (giftUrl: string, preview: linkPreview) => {
  const response = await secureClient.post(url, "/api/gift/register", {
    url: giftUrl,
    title: preview.title,
    image: preview.image,
    description: preview.description,
  });

  return response.data;
};

const createShout = async (file: File) => {
  const response = await secureClient.upload(url, "/api/shout", file, "Shout");
  return response.data;
};

const registerUser = async (username: string, avatar: File) => {
  const response = await secureClient.post(url, "/api/users/register", {
    username,
  });
  validateResponse(response.data);
  const updateAvatarResponse = await secureClient.upload(
    url,
    "/api/users/updateAvatar",
    avatar,
    "Avatar"
  );
  validateResponse(updateAvatarResponse.data);
};

const getCurrentCustomer = async (): Promise<iUser> => {
  const response = await secureClient.get(url, "/api/profile");
  validateResponse(response);

  const user: iUser = response.data;
  if (!user.avatar || !user.id || !user.userName || !user.identityKey) {
    logService.error(`Invalid response from server. Got ${response}`);
    throw new Error("Invalid response.");
  }

  return user;
};

const getProfile = async (username: string): Promise<iUser> => {
  const response = await secureClient.get(url, "/api/profile/user", {
    username,
  });
  validateResponse(response);

  const user: iUser = response.data;
  if (!user.avatar || !user.id || !user.userName || !user.identityKey) {
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
  dummyCall,
  getShouts: getGifts,
  createShout,
  registerUser,
  getProfile,
  getCurrentCustomer,
  getPostsFromUser,
  registerGift,
};
