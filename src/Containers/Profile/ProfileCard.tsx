import React, { useState } from 'react';
import { iCustomerPublic, iRegisteredCustomer } from '../../Utils/Apis/Identity.service';
import { storageService } from '../../Utils/Apis/storage.service';
import { tamarakService } from '../../Utils/Apis/tamarak.service';
import AddGiftModal from './AddGiftModal';
import './ProfileCard.scss';
import ProfileEditModal from './ProfileEditModal';

interface ProfileCardProps {
    isAuthorized: boolean;
    customerPublic?: iCustomerPublic;
    setCustomerPublic: (customer: iCustomerPublic) => void;
    addGifty: (url: string) => void;
}

const ProfileCard = ({ isAuthorized, customerPublic, setCustomerPublic, addGifty }: ProfileCardProps) => {
    const [customerRegistered, setCustomerRegistered] = useState<iRegisteredCustomer | undefined>(undefined);
    const [showProfileEdit, setShowProfileEdit] = useState(false);
    const [showAddGift, setShowAddGift] = useState(false);

    const handleFollow = () => {};

    const handleEditProfile = () => {
        setShowProfileEdit(true);
    };

    const handleAddGift = () => {
        setShowAddGift(true);
    };

    const handleAddGiftCancel = () => {
        setShowAddGift(false);
    };

    const handleAddGiftSubmit = (url: string) => {
        setShowAddGift(false);
        addGifty(url);
    };

    const handleProfileEditClosed = async (customerEdit: iRegisteredCustomer, imageSource?: File) => {
        setShowProfileEdit(false);

        if (imageSource) {
            customerEdit.avatar = await storageService.uploadImage(imageSource, customerEdit.identityKey);
        }
        // this needs to call tamarak with new params
        const response = await tamarakService.updateCustomerProfile(customerEdit);

        setCustomerPublic(response);
        setCustomerRegistered(response);
    };

    const handleProfileEditCancelled = () => {
        setShowProfileEdit(false);
    };

    console.log(customerPublic);
    return (
        <>
            {isAuthorized ? (
                <>
                    <ProfileEditModal onCancel={handleProfileEditCancelled} onClose={handleProfileEditClosed} show={showProfileEdit} />
                    <AddGiftModal show={showAddGift} onSubmit={handleAddGiftSubmit} onCancel={handleAddGiftCancel} />
                </>
            ) : (
                <></>
            )}
            <div className="card card-style card-style-form">
                <div className="d-flex content mb-1">
                    {/* <!-- left side of profile --> */}
                    <div className="flex-grow-1">
                        <h1 className="font-700">{customerPublic?.name}</h1>
                        <p className="mb-2">{customerPublic?.bio}</p>
                        <p className="font-10">
                            <strong className="color-theme pe-1">1k</strong>Followers
                            <strong className="color-theme ps-3 pe-1">342</strong>Following
                        </p>
                    </div>
                    {/* <!-- right side of profile. increase image width to increase column size--> */}
                    {/* This wont reload until you hard reload the page.  */}
                    <img src={customerPublic ? customerPublic.avatar : ''} width="115" height="115" className="rounded-circle mt-3 shadow-xl preload-img" />
                </div>
                {/* <!-- follow buttons--> Don't show this if this is customer's profile page */}
                {isAuthorized ? (
                    <div className="content mb-0">
                        <div className="row mb-0">
                            <div className="col-6">
                                <a href="#" onClick={handleAddGift} className="btn btn-full btn-s rounded-s text-uppercase font-900 bg-highlight">
                                    Add Item
                                </a>
                            </div>
                            <div className="col-6">
                                <a
                                    href="#"
                                    onClick={handleEditProfile}
                                    className="btn btn-full btn-s rounded-s text-uppercase font-900 color-theme border-blue-dark"
                                >
                                    Edit
                                </a>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="content mb-0">
                        <div className="row mb-0">
                            <div className="col-6">
                                <a href="#" className="btn btn-full btn-s rounded-s text-uppercase font-900 bg-highlight">
                                    Follow
                                </a>
                            </div>
                            {/* <div className="col-6">
                <a
                  href="#"
                  className="btn btn-full btn-s rounded-s text-uppercase font-900 color-theme border-blue-dark"
                >
                  Message
                </a>
              </div> */}
                        </div>
                    </div>
                )}
                <div className="divider mt-4 mb-0"></div>
            </div>
        </>
    );
};

export default ProfileCard;
