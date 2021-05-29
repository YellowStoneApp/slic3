import React, { useEffect, useState } from 'react';
import { tamarakService, iGift, iGiftRequest } from '../../Utils/Apis/tamarak.service';
import { useRecoilState } from 'recoil';
import { errorState } from '../../Hooks/error.hook';
import { giftRegistry } from '../../Utils/Apis/Utils/gift.registry';
import * as queryString from 'query-string';
import { logService } from '../../Utils/Apis/logging.service';
import { iCustomerPublic, identityService, iRegisteredCustomer } from '../../Utils/Apis/Identity.service';
import GiftItem from './GiftItem';
import ProfileCard from '../Profile/ProfileCard';
import ProfileEditModal from '../Profile/ProfileEditModal';
import { storageService } from '../../Utils/Apis/storage.service';
import BuyGiftModal from './BuyGiftModal';

const GalleryContainer = () => {
    const [gifts, setGifts] = useState<iGift[] | undefined>(undefined);
    const [, setError] = useRecoilState(errorState);
    const [customerPublic, setCustomerPublic] = useState<iCustomerPublic | undefined>(undefined);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [selectedGift, setSelectedGift] = useState<iGift | undefined>(undefined);
    const [showBuyGift, setShowBuyGift] = useState(false);

    const getGifts = async (customerId: string) => {
        try {
            const gifties = await tamarakService.getGifts(customerId);
            updateGifts(gifties);
        } catch (error) {
            console.error(error);
        }
    };

    const updateGifts = (gifts: iGift[]) => {
        gifts.sort((a, b) => {
            return Date.parse(b.dateAdded) - Date.parse(a.dateAdded);
        });
        setGifts(gifts);
    };

    const getCustomer = async (customerId: string) => {
        let authCustomer: iRegisteredCustomer | undefined = undefined;
        try {
            // if customer is authenticated and authorized to make changes on this page.
            authCustomer = await identityService.getCurrentCustomer();
        } catch (error) {
            // redirect to login here?
            logService.error(error);
        }

        if (authCustomer?.identityKey === customerId) {
            setIsAuthorized(true);
            setCustomerPublic(authCustomer);
        } else {
            try {
                const customerPublic = await tamarakService.getCustomerPublicProfile(customerId);
                setCustomerPublic(customerPublic);
            } catch (error) {
                logService.error(error);
            }
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

    const handleAddGift = async (gift: iGiftRequest) => {
        if (customerPublic) {
            await tamarakService.registerGift(gift);
            await getGifts(customerPublic?.identityKey);
        }
    };

    const handleRemoveGift = async (giftId: number) => {
        const giftsAfterChange = await tamarakService.removeGift(giftId);
        updateGifts(giftsAfterChange);
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

    const handleBuyGift = (gift: iGift) => {
        setSelectedGift(gift);
        setShowBuyGift(true);
    };

    const handleCancel = () => {
        setSelectedGift(undefined);
        setShowBuyGift(false);
    };

    const handleBuy = async (email?: string) => {
        // call tamarak here
        if (selectedGift) {
            try {
                const response = await tamarakService.registerGiftPurchase(selectedGift, email);
            } catch (error) {
                // swallow this as error is already logged lower in call stack.  Nothing to show user other than we don fucked up.
            }
        }
        setSelectedGift(undefined);
        setShowBuyGift(false);
    };

    const numCards = getNumCardsInRow();

    return (
        <>
            <div className="page-content header-clear-medium">
                <ProfileCard addGifty={handleAddGift} customerPublic={customerPublic} isAuthorized={isAuthorized} setCustomerPublic={setCustomerPublic} />
                <BuyGiftModal handleCancel={handleCancel} customerPublic={customerPublic} handleBuy={handleBuy} gift={selectedGift} show={showBuyGift} />

                <div className="row text-center mb-0">
                    {gifts ? (
                        gifts.map((gift, index) => {
                            return (
                                <GiftItem
                                    key={index}
                                    gift={gift}
                                    position={index}
                                    numCardsInRow={numCards}
                                    isAuthorized={isAuthorized}
                                    removeGift={handleRemoveGift}
                                    handleBuyGift={handleBuyGift}
                                />
                            );
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
