import axios from "axios";
import { tamarakService } from "../tamarak.service";
import { apiErrorHandlingWithLogs, requestType } from "./call.wrapper";

const apiKey = process.env.REACT_APP_LINK_PREVIEW;

export interface linkPreview {
  description: string;
  image: string;
  title: string;
}

const registerGift = async (url: string) => {
  // validation

  // get url meta data
  try {
    const response = await apiErrorHandlingWithLogs(
      async () => {
        return await axios.get(
          `http://api.linkpreview.net/?key=${apiKey}&q=${url}`
        );
      },
      url,
      "http://api.linkpreview.net",
      requestType.get
    );
    const preview: linkPreview = response.data;

    // write to tamarak
    const regResponse = await tamarakService.registerGift(url, preview);
  } catch (error) {}
};

export const giftRegistry = {
  registerGift,
};
