import { logService } from '../logging.service';

enum callSuccess {
    failure = 'FAIL',
    success = 'SUCCESS',
}

interface logMessage {
    method: string;
    successful: callSuccess;
    requestTime: number;
    url?: string;
    requestType?: requestType;
    errorMessage?: string;
    errorCode?: string;
    request?: any;
    response?: any;
}

export enum requestType {
    get = 'GET',
    post = 'POST',
    Storage = 'STORAGE',
}

/**
 * Any call to our external APIs should go through this function. That way we know if something has gone wrong.
 * @param callback
 * @param functionName
 * @returns
 */
export const apiErrorHandlingWithLogs = async (callback: Function, functionName: string, url?: string, requestType?: requestType, requestData?: any) => {
    const message: logMessage = {
        method: functionName,
        successful: callSuccess.failure,
        requestTime: -1,
        url: url,
        requestType: requestType,
        request: requestData,
    };
    const t0 = performance.now();
    try {
        const response = await callback();
        message.requestTime = performance.now() - t0;
        message.successful = callSuccess.success;
        message.response = response.data;
        logService.info(message);
        return response;
    } catch (error) {
        message.errorMessage = error.message;
        message.requestTime = performance.now() - t0;
        message.errorCode = error.code;
        logService.info(message);
        logService.error(error);
        throw error;
    }
};
