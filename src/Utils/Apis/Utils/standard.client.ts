import axios from 'axios';
import { apiErrorHandlingWithLogs, requestType } from './call.wrapper';

/**
 *  This class just wraps Axios. BUT you should use it because it wraps axios with logging and error handling / re throwing.
 *
 * Use this class! Don't be a jackass!! Axios shouldn't be imported all over this project.
 */

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
        requestType.get,
        data
    );
    return response;
};

const post = async (baseUrl: string, api: string, payload: any) => {
    const response = await apiErrorHandlingWithLogs(
        async () => {
            return await axios.post(`${baseUrl}${api}`, payload);
        },
        api,
        baseUrl,
        requestType.post,
        payload
    );
    return response;
};

export const standardClient = {
    get,
    post,
};
