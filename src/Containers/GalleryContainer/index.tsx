import React, { useEffect, useState } from "react";
import { tamarakService, iGift } from "../../Utils/Apis/tamarak.service";
import { useRecoilState } from "recoil";
import { errorState } from "../../Hooks/error.hook";
import { giftRegistry } from "../../Utils/Apis/Utils/gift.registry";
import * as queryString from "query-string";
import { logService } from "../../Utils/Apis/logging.service";
import {
  iCustomerPublic,
  identityService,
} from "../../Utils/Apis/Identity.service";
import GiftItem from "./GiftItem";
import ProfileCard from "./ProfileCard";

const GalleryContainer = () => {
  const [gifts, setGifts] = useState<iGift[] | undefined>(undefined);
  const [url, setUrl] = useState("");
  const [, setError] = useRecoilState(errorState);
  const [customerPublic, setCustomerPublic] =
    useState<iCustomerPublic | undefined>(undefined);
  const [isAuthorized, setIsAuthorized] = useState(false);

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
      } else {
        const customerPublic = await tamarakService.getCustomerPublicProfile(
          customerId
        );
        setCustomerPublic(customerPublic);
      }
    } catch (error) {
      // redirect to login here?
      logService.error(error.message);
    }
  };

  const loadCustomerFromSearch = async () => {
    const parsed = queryString.parse(window.location.search);
    if (parsed && typeof parsed.id === "string") {
      getCustomer(parsed.id);
      getGifts(parsed.id);
    } else {
      logService.error(
        `Cannot get customer id from search string ${window.location.search}`
      );
    }
  };

  useEffect(() => {
    loadCustomerFromSearch();
  }, []);

  const handleAddGift = () => {};

  const handleFollow = () => {};

  const handleEditProfile = () => {};

  const submitUrl = () => {
    if (url !== "") {
      giftRegistry.registerGift(url);
      setUrl("");
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
      {/* <Sticky
        top={40000}
        child={
          <a
            href="#"
            onClick={(e) => handleAddItem(e)}
            className="btn btn-l mb-3 rounded-xl text-uppercase font-900 shadow-s bg-mint-dark"
          >
            <i className="fa fa-plus font-15 rounded-xl text-center"></i>
          </a>
        }
      ></Sticky> */}

      <div className="page-content header-clear-medium">
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
              return (
                <GiftItem
                  key={index}
                  gift={gift}
                  position={index}
                  numCardsInRow={numCards}
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
