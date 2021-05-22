import React, { useEffect, useState } from 'react';
import { tamarakService, iGift } from '../../Utils/Apis/tamarak.service';
import { useRecoilState } from 'recoil';
import { errorState } from '../../Hooks/error.hook';
import { giftRegistry } from '../../Utils/Apis/Utils/gift.registry';
import * as queryString from 'query-string';
import { logService } from '../../Utils/Apis/logging.service';
import { iCustomerPublic, identityService, iRegisteredCustomer } from '../../Utils/Apis/Identity.service';
import GiftItem from './GiftItem';
import ProfileCard from './ProfileCard';
import ProfileEditModal from './ProfileEditModal';
import { storageService } from '../../Utils/Apis/storage.service';

const GalleryContainer = () => {
    const [gifts, setGifts] = useState<iGift[] | undefined>(undefined);
    const [url, setUrl] = useState('');
    const [, setError] = useRecoilState(errorState);
    const [customerPublic, setCustomerPublic] = useState<iCustomerPublic | undefined>(undefined);
    const [customerRegistered, setCustomerRegistered] = useState<iRegisteredCustomer | undefined>(undefined);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [showProfileEdit, setShowProfileEdit] = useState(false);

    const getGifts = async (customerId: string) => {
        try {
            const response = await tamarakService.getGifts(customerId);
            setGifts(response);
        } catch (error) {
            console.error(error);
        }
    };

    const getCustomer = async (customerId: string) => {
        try {
            // if customer is authenticated and authorized to make changes on this page.
            const authCustomer = await identityService.getCurrentCustomer();
            if (authCustomer.identityKey === customerId) {
                setIsAuthorized(true);
                setCustomerPublic(authCustomer);
                setCustomerRegistered(authCustomer);
            } else {
                const customerPublic = await tamarakService.getCustomerPublicProfile(customerId);
                setCustomerPublic(customerPublic);
            }
        } catch (error) {
            // redirect to login here?
            logService.error(error.message);
        }
    };

    const loadCustomerFromSearch = async () => {
        const parsed = queryString.parse(window.location.search);
        if (parsed && typeof parsed.id === 'string') {
            getCustomer(parsed.id);
            getGifts(parsed.id);
        } else {
            logService.error(`Cannot get customer id from search string ${window.location.search}`);
        }
    };

    useEffect(() => {
        loadCustomerFromSearch();
    }, []);

    const handleAddGift = () => {};

    const handleFollow = () => {};

    const handleEditProfile = () => {
        setShowProfileEdit(true);
    };

    const handleProfileEditClosed = async (customerEdit: iRegisteredCustomer, imageSource?: File) => {
        setShowProfileEdit(false);

        if (imageSource) {
            customerEdit = await storageService.uploadImage(imageSource, customerEdit);
            console.log(customerEdit);
        }
        // this needs to call tamarak with new params
        const response = await tamarakService.updateCustomerProfile(customerEdit);
        setCustomerPublic(response);
        setCustomerRegistered(response);
    };

    const handleProfileEditCancelled = () => {
        setShowProfileEdit(false);
    };

    const submitUrl = () => {
        if (url !== '') {
            giftRegistry.registerGift(url);
            setUrl('');
        }
    };

    const getNumCardsInRow = () => {
        const width = window.innerWidth;
        if (width < 500) {
            return 1;
        } else if (width < 900) {
            return 2;
        }
        return 3;
    };

    const urlEntered = (value: string) => {
        setUrl(value);
    };

    const numCards = getNumCardsInRow();

    return (
        <>
            <div className="page-content header-clear-medium">
                {customerRegistered ? (
                    <ProfileEditModal
                        onCancel={handleProfileEditCancelled}
                        onClose={handleProfileEditClosed}
                        show={showProfileEdit}
                        customer={customerRegistered}
                    />
                ) : (
                    <></>
                )}
                <ProfileCard
                    isAuthorized={isAuthorized}
                    customerPublic={customerPublic}
                    addGifty={handleAddGift}
                    followClicked={handleFollow}
                    handleEditProfile={handleEditProfile}
                />

                <div className="row text-center mb-0">
                    {gifts ? (
                        gifts.map((gift, index) => {
                            return <GiftItem key={index} gift={gift} position={index} numCardsInRow={numCards} />;
                        })
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    );
};

export default GalleryContainer;
