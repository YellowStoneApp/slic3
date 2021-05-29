import axios from 'axios';
import { tamarakService } from '../tamarak.service';
import { apiErrorHandlingWithLogs, requestType } from './call.wrapper';

const apiKey = process.env.REACT_APP_LINK_PREVIEW;

export interface linkPreview {
    description: string;
    image: string;
    title: string;
}

const previewGift = async (url: string): Promise<linkPreview> => {
    const response = await apiErrorHandlingWithLogs(
        async () => {
            return await axios.get(`https://api.linkpreview.net/?key=${apiKey}&q=${url}`);
        },
        url,
        'https://api.linkpreview.net',
        requestType.get
    );
    return response.data;
};

export const giftRegistry = {
    previewGift,
};
