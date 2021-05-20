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
import { iCustomerPublic } from "../../Utils/Apis/Identity.service";
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
      const customerPublic = await tamarakService.getCustomerPublicProfile(
        customerId
      );
      console.log(customerPublic);
      setCustomerPublic(customerPublic);
    } catch (error) {
      logService.error(error);
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
    Auth.currentAuthenticatedUser()
      .then((customer) => {
        setAuthCustomer(customer);
      })
      .catch(() => console.log("No customer signed in."));
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
    <div className="page-content header-clear-medium">
      {/* <div className="card card-style">
        <div className="content mb-3">
          <h3 className="mb-1">{customerPublic ? customerPublic.name : ""}</h3>
          <p>Get 'em what they want!</p>
        </div>
      </div> */}

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
