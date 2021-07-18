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
            try {
                const status = await axios.get(`https://api.linkpreview.net/?key=${apiKey}&q=${url}`);
                return status;
            } catch (error) {
                console.log(error);
            }
        },
        url,
        'https://api.linkpreview.net',
        requestType.get
    );
    const preview: linkPreview = response.data;
    console.log(preview);
    if (preview.image && typeof preview.image === 'string') {
        // replace http with https - for some reason shopify does this
        if (preview.image.startsWith('http://')) {
            preview.image = 'https://' + preview.image.slice(7, preview.image.length);
        }
    }
    console.log(preview);
    return preview;
};

export const giftRegistry = {
    previewGift,
};
