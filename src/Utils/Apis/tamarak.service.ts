/**
 * Default behavior in this module. If something goes wrong this code should throw an error. The caller is responsible for bubbling this up to the user however they see fit.
 */

import { apiErrorHandlingWithLogs } from './Utils/call.wrapper';
import axios from 'axios';
import { logService } from './logging.service';
import { secureClient } from './Utils/secure.client';
import { linkPreview } from './Utils/gift.registry';
import { iCustomerSignUp, iCustomerPublic, iRegisteredCustomer } from './Identity.service';
import { standardClient } from './Utils/standard.client';
import { storageService } from './storage.service';

const REGISTERED_CUSTOMER_CACHE_KEY = 'REGISTERED_CUSTOMER';

const url = process.env.REACT_APP_MAIN_SERVICE_URL;
if (!url) {
    throw new Error('Cannot load url from env variable');
}

export interface iGift {
    url: string;
    dateAdded: string;
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
    }, '/api/dummy');
};

/** Publicly available functions */

const getGifts = async (customerId: string): Promise<iGift[]> => {
    const response = await standardClient.get(url, '/api/giftpublic', {
        customerId: customerId,
    });
    return response.data;
};

const getCustomerPublicProfile = async (customerId: string): Promise<iCustomerPublic> => {
    const response = await standardClient.get(url, '/api/customerpublic', {
        customerId: customerId,
    });
    validateResponse(response);

    const customer: iCustomerPublic = response.data;
    if (!customer.avatar || !customer.name || !customer.identityKey) {
        logService.error(`Invalid response from server. Got ${response}`);
        throw new Error('Invalid response.');
    }

    return customer;
};

const registerGift = async (giftUrl: string, preview: linkPreview) => {
    const response = await secureClient.post(url, '/api/gift/register', {
        url: giftUrl,
        title: preview.title,
        image: preview.image,
        description: preview.description,
    });

    return response.data;
};

/** Access Controlled functions */

const removeGift = async (giftId: number): Promise<iGift[]> => {
    const response = await secureClient.post(url, '/api/gift/remove', {
        id: giftId,
    });

    return response.data;
};

/**
 * Sets initial customer information. This can get called multiple times even if the customer is already registered. We don't know that here.
 * The server has source of truth on customer profile information.
 *
 * Here hit server with customer info.
 *
 * Then cache the server response for customer info for use in any of the other functions.
 * @param customer
 * @returns
 */
const registerCustomer = async (customer: iCustomerSignUp): Promise<iRegisteredCustomer> => {
    const response = await secureClient.post(url, '/api/customer/register', {
        name: customer.name,
        email: customer.email,
        avatar: customer.avatar,
    });
    validateResponse(response.data);
    return response.data;
};

/**
 * This is the source of truth for the registered customer profile.
 * This reads from a local cache for registered customer profile information. If there's nothign there, hit tamarak for the registered customer profile
 * The local cache will be set by changes to the customer profile
 *
 * This is in two places and SHOULD ONLY BE IN TWO PLACES!!!!!
 *
 * - registerCustomer
 * - updateCustomerProfile
 *
 * And of course we set the cache if we need to here.
 *
 * @param customerId customer IdentityKey
 */
const getRegisteredCustomer = async (customerId: string): Promise<iRegisteredCustomer> => {
    const customer = await getRegisteredCustomerFromCache(customerId);

    console.log('customer from cache ', customer);

    if (customer) {
        return customer;
    }

    const custFromTam = await secureClient.get(url, '/api/customer');

    console.log(custFromTam);

    validateResponse(custFromTam);

    const customerReturned = validateRegisteredCustomer(custFromTam.data);

    console.log(customerReturned, 'validated customer');

    if (!customerReturned) {
        throw new Error('Customer retuned from server not valid.');
    }

    await cacheRegisteredCustomer(customerReturned);

    return customerReturned;
};

const updateCustomerProfile = async (customer: iRegisteredCustomer): Promise<iRegisteredCustomer> => {
    const response = await secureClient.post(url, '/api/customer/update', customer);

    validateResponse(response);

    const customerReturned = validateRegisteredCustomer(response.data);

    if (!customerReturned) {
        throw new Error('Customer retuned from server not valid.');
    }

    await cacheRegisteredCustomer(customerReturned);

    return customerReturned;
};

export const tamarakService = {
    getCustomerPublicProfile,
    getRegisteredCustomer,
    updateCustomerProfile,
    dummyCall,
    getGifts,
    registerCustomer,
    registerGift,
    removeGift,
};

/** Private functions... These could go in a helper file */

/**
 * Cache customer. Throw error on fail
 * @param customer
 */
const cacheRegisteredCustomer = async (customer: iRegisteredCustomer) => {
    localStorage.setItem(REGISTERED_CUSTOMER_CACHE_KEY, JSON.stringify(customer));
};

/**
 * This reads customer profile information from cache.
 * Throw error on failed read.
 *
 * If customer is not in cahce - or - the customer profile in the cache does not match the id return undefined.
 * @param customerId
 */
const getRegisteredCustomerFromCache = async (customerId: string): Promise<iRegisteredCustomer | undefined> => {
    const cachedCustomerString = localStorage.getItem(REGISTERED_CUSTOMER_CACHE_KEY);
    if (cachedCustomerString) {
        const cachedCustomer = validateRegisteredCustomer(JSON.parse(cachedCustomerString));
        if (cachedCustomer && cachedCustomer.identityKey === customerId) {
            return cachedCustomer;
        }
        logService.error("Cached customer read from JSON didn't match the customerIdentityKey " + cachedCustomerString + ' customerId: ' + customerId);
    }
    return undefined;
};

/**
 * Typescript doesn't really do reflection which is weird AF... Maybe there's a tool for this but didn't find anything that didn't look like a mess on the internets..
 * So we do by hand.... And they say javascript is a real language...
 * @param thing
 * @returns
 */
const validateRegisteredCustomer = (thing: any): iRegisteredCustomer | undefined => {
    if (thing) {
        if (thing.email && thing.name && thing.identityKey) {
            return thing;
        }
    }
    return undefined;
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
        logService.error(`Server threw invalid response ${JSON.stringify(response)}`);
        throw new Error(response.message ?? 'Got broken response from server');
    }
};
