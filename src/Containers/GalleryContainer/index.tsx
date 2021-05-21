import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { tamarakService, iGift } from "../../Utils/Apis/tamarak.service";
import { useCurrentWalletUser } from "../../Hooks/currentWalletUser.hook";
import { useRecoilState } from "recoil";
import { errorState } from "../../Hooks/error.hook";
import FormInput from "../../Components/FormInput";
import Form from "../../Components/Form";
import { giftRegistry } from "../../Utils/Apis/Utils/gift.registry";
import { Auth } from "aws-amplify";
import * as queryString from "query-string";
import { logService } from "../../Utils/Apis/logging.service";
import {
  iCustomerPublic,
  identityService,
} from "../../Utils/Apis/Identity.service";
import GiftItem from "./GiftItem";

const GalleryContainer = () => {
  const [gifts, setGifts] = useState<iGift[] | undefined>(undefined);
  const [url, setUrl] = useState("");
  const [, setError] = useRecoilState(errorState);
  const [authCustomer, setAuthCustomer] = useState();
  const [customerPublic, setCustomerPublic] =
    useState<iCustomerPublic | undefined>(undefined);

  const getGifts = async (customerId: string) => {
    try {
      const response = await tamarakService.getGifts(customerId);
      console.log(response);
      setGifts(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getCustomer = async (customerId: string) => {
    try {
      console.log(`getting public profile for ${customerId}`);
      const customerPublic = await tamarakService.getCustomerPublicProfile(
        customerId
      );
      console.log(customerPublic);
      setCustomerPublic(customerPublic);
    } catch (error) {
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

  // check if current authenticated customer is same as what's being viewed
  const getCurrentCustomer = async () => {
    //const currAuthCustomer = await identityService.getCurrentCustomer();
  };

  useEffect(() => {
    loadCustomerFromSearch();
    getCurrentCustomer();
  }, []);

  const submitUrl = () => {
    if (url !== "") {
      giftRegistry.registerGift(url);
      setUrl("");
    }
  };

  const getNumCardsInRow = () => {
    const width = window.innerWidth;
    if (width < 400) {
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
    <div>
      <div className="card card-style">
        <div className="d-flex content mb-1">
          {/* <!-- left side of profile --> */}
          <div className="flex-grow-1">
            <h1 className="font-700">{customerPublic?.name}</h1>
            <p className="mb-2">Bio</p>
            {/* <p className="font-10">
              <strong className="color-theme pe-1">1k</strong>Followers
              <strong className="color-theme ps-3 pe-1">342</strong>Following
            </p> */}
          </div>
          {/* <!-- right side of profile. increase image width to increase column size--> */}
          <img
            src={
              customerPublic
                ? customerPublic.avatar
                : "https://image.freepik.com/free-vector/cute-teddy-bear-waving-hand-cartoon-icon-illustration_138676-2714.jpg"
            }
            width="115"
            height="115"
            className="rounded-circle mt-3 shadow-xl preload-img"
          />
        </div>
        {/* <!-- follow buttons--> Don't show this if this is customer's profile page */}
        <div className="content mb-0">
          <div className="row mb-0">
            <div className="col-6">
              <a
                href="#"
                className="btn btn-full btn-s rounded-s text-uppercase font-900 bg-blue-dark"
              >
                Follow
              </a>
            </div>
            <div className="col-6">
              <a
                href="#"
                className="btn btn-full btn-s rounded-s text-uppercase font-900 color-theme border-blue-dark"
              >
                Message
              </a>
            </div>
          </div>
        </div>
        <div className="divider mt-4 mb-0"></div>
      </div>

      <div className="row text-center mb-0">
        {gifts ? (
          gifts.map((gift, index) => {
            return (
              <GiftItem gift={gift} position={index} numCardsInRow={numCards} />
            );
          })
        ) : (
          <></>
        )}
      </div>
      <Form
        onSubmit={submitUrl}
        title="What do you want"
        submitButtonTitle="Get this"
        subtitle="hehehehe"
      >
        <FormInput
          type="url"
          name="url"
          placeholder="What do you want?"
          onValueChange={urlEntered}
        />
      </Form>
    </div>
  );
};

export default GalleryContainer;
