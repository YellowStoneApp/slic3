import React from 'react';
import { iCustomerPublic } from '../../Utils/Apis/Identity.service';
import './ProfileCard.scss';

interface ProfileCardProps {
    isAuthorized: boolean;
    customerPublic?: iCustomerPublic;
    addGifty: () => void;
    followClicked: () => void;
    handleEditProfile: () => void;
}

const ProfileCard = ({ isAuthorized, customerPublic, addGifty, followClicked, handleEditProfile }: ProfileCardProps) => {
    return (
        <div className="card card-style card-style-form">
            <div className="d-flex content mb-1">
                {/* <!-- left side of profile --> */}
                <div className="flex-grow-1">
                    <h1 className="font-700">{customerPublic?.name}</h1>
                    <p className="mb-2">Bio</p>
                    <p className="font-10">
                        <strong className="color-theme pe-1">1k</strong>Followers
                        <strong className="color-theme ps-3 pe-1">342</strong>Following
                    </p>
                </div>
                {/* <!-- right side of profile. increase image width to increase column size--> */}
                <img src={customerPublic ? customerPublic.avatar : ''} width="115" height="115" className="rounded-circle mt-3 shadow-xl preload-img" />
            </div>
            {/* <!-- follow buttons--> Don't show this if this is customer's profile page */}
            {isAuthorized ? (
                <div className="content mb-0">
                    <div className="row mb-0">
                        <div className="col-6">
                            <a href="#" onClick={addGifty} className="btn btn-full btn-s rounded-s text-uppercase font-900 bg-highlight">
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
    );
};

export default ProfileCard;
