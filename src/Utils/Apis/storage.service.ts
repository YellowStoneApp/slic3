import Storage from '@aws-amplify/storage';
import { iRegisteredCustomer } from './Identity.service';
import { logService } from './logging.service';
import { apiErrorHandlingWithLogs, requestType } from './Utils/call.wrapper';

const BUCKET_URL = 'https://mammothstoragebucket200247-dev.s3-us-west-2.amazonaws.com/public/';

const uploadImage = async (file: File, customer: iRegisteredCustomer): Promise<iRegisteredCustomer> => {
    try {
        validateImageFile(file);
        const extension = getFileExtension(file.name);
        const fullImageName = customer.identityKey + '-full.' + extension;
        const result = await apiErrorHandlingWithLogs(
            async () => {
                return await Storage.put(fullImageName, file, {
                    contentType: file.type,
                });
            },
            'Storage.put',
            undefined,
            requestType.Storage
        );
        const fileAccessURL = await getImageUrlByKey(fullImageName);
        customer.avatar = fileAccessURL;
        console.log(customer);
        return customer;
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
