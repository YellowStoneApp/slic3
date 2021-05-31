import Storage from '@aws-amplify/storage';
import { apiErrorHandlingWithLogs, requestType } from './Utils/call.wrapper';
import { v4 as uuidv4 } from 'uuid';

const BUCKET_URL = 'https://mammothstoragebucket200247-dev.s3-us-west-2.amazonaws.com/public/';

/**
 * This function will fail on the second call. I'm not entirely sure why but this is a known bug in the program currently.
 *
 * The fix is hard reload CMD-R.
 * @param file
 * @param keyBase
 * @returns
 */
const uploadImage = async (file: File, keyBase: string): Promise<string> => {
    try {
        validateImageFile(file);
        const key = uuidv4();
        const extension = getFileExtension(file.name);
        const fullImageName = key + '-full.' + extension;
        const result = await apiErrorHandlingWithLogs(
            async () => {
                return await Storage.put(fullImageName, file, {
                    contentType: 'image/jpeg', // this is problematic if you use file.type for some reason...
                });
            },
            'Storage.put',
            undefined,
            requestType.Storage
        );
        return await getImageUrlByKey(fullImageName);
    } catch (error) {
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

export const storageService = {
    uploadImage,
    getImageUrlByKey,
};
