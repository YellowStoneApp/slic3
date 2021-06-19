import Storage from '@aws-amplify/storage';
import { apiErrorHandlingWithLogs, requestType } from './Utils/call.wrapper';
import Resizer from 'react-image-file-resizer';
import { v4 as uuidv4 } from 'uuid';
import { logService } from './logging.service';

const BUCKET_URL = 'https://mammothstoragebucket200247-dev.s3-us-west-2.amazonaws.com/public/';

/**
 * Upload image file
 * @param file
 * @param keyBase
 * @returns
 */
const uploadImage = async (file: File, keyBase: string): Promise<string> => {
    try {
        validateImageFile(file);
        const resized = await resizeImage(file);
        const key = uuidv4();
        const extension = getFileExtension(resized.name);
        const fullImageName = key + '-full.' + extension;
        const result = await apiErrorHandlingWithLogs(
            async () => {
                return await Storage.put(fullImageName, resized, {
                    contentType: 'image/jpeg', // this is problematic if you use file.type for some reason...
                });
            },
            'Storage.put',
            undefined,
            requestType.Storage
        );
        return await getImageUrlByKey(fullImageName);
    } catch (error) {
        logService.error(error);
        throw error;
    }
};

const getFileExtension = (fileName: string) => {
    return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
};

const validateImageFile = (file: File) => {
    switch (file.type) {
        case 'image/jpeg':
        case 'image/jpg':
        case 'image/png':
            return;

        default:
            throw new Error('File is not an allowed type ' + file.type);
    }
};

const getImageUrlByKey = async (key: string): Promise<string> => {
    // just serve public urls from s3.
    // const fileAccessURL = await apiErrorHandlingWithLogs(
    //     async () => {
    //         return await Storage.get(key);
    //     },
    //     'Storage.get',
    //     undefined,
    //     requestType.Storage
    // );
    // if (typeof fileAccessURL === 'string') {
    //     return fileAccessURL;
    // }

    // this could be pretty brittle if we change storage bucket...
    return BUCKET_URL + key;
};

const resizeImage = async (file: File): Promise<File> => {
    return new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            200,
            200,
            'PNG',
            100,
            0,
            (uri) => {
                if (uri instanceof File) {
                    resolve(uri);
                } else {
                    throw new Error('Returned uri is not instance of file. Resizing failed.');
                }
            },
            'file'
        );
    });
};

export const storageService = {
    uploadImage,
    getImageUrlByKey,
};
