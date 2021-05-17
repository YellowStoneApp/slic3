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

const GalleryContainer = () => {
  const [gifts, setGifts] = useState<iGift[] | undefined>(undefined);
  const [url, setUrl] = useState("");
  const [, setError] = useRecoilState(errorState);
  const [customer, setCustomer] = useState();

  const getShouts = async () => {
    try {
      const response = await tamarakService.getShouts();
      console.log(response);
      setGifts(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentCustomer = async () => {
    Auth.currentAuthenticatedUser()
      .then((customer) => {
        setCustomer(customer);
      })
      .catch(() => console.log("No customer signed in."));
  };

  useEffect(() => {
    getCurrentCustomer();
    getShouts();
  }, []);

  const submitUrl = () => {
    if (url !== "") {
      giftRegistry.registerGift(url);
      setUrl("");
    }
  };

  const urlEntered = (value: string) => {
    setUrl(value);
  };

  return (
    <div className="page-content header-clear-medium">
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
      <div className="card card-style">
        <div className="content mb-3">
          <h3 className="mb-1">Avi's Dream Gifts</h3>
          <p>Get him what he wants!</p>

          <div className="row text-center row-cols-2 mb-0">
            <a
              className="col"
              data-gallery="gallery-1"
              href="images/pictures/1t.jpg"
              title="Vynil and Typerwritter"
            >
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/61dhEF0XfkS._AC_UX695_.jpg"
                className="preload-img img-fluid rounded-xs"
                alt="img"
              />
              <p className="font-600 pb-1">Writer</p>
            </a>
            <a
              className="col"
              data-gallery="gallery-1"
              href="images/pictures/2t.jpg"
              title="Cream Cookie"
            >
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/61dhEF0XfkS._AC_UX695_.jpg"
                className="preload-img img-fluid rounded-xs"
                alt="img"
              />
              <p className="font-600 pb-1">Cream</p>
            </a>
            <a
              className="col"
              data-gallery="gallery-1"
              href="images/pictures/3t.jpg"
              title="Cookies and Flowers"
            >
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/61dhEF0XfkS._AC_UX695_.jpg"
                className="preload-img img-fluid rounded-xs"
                alt="img"
              />
              <p className="font-600 pb-1">Cookie</p>
            </a>
            <a
              className="col"
              data-gallery="gallery-1"
              href="images/pictures/4t.jpg"
              title="Pots and Pans"
            >
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/61dhEF0XfkS._AC_UX695_.jpg"
                className="preload-img img-fluid rounded-xs"
                alt="img"
              />
              <p className="font-600 pb-1">Pots</p>
            </a>
            <a
              className="col"
              data-gallery="gallery-1"
              href="images/pictures/5t.jpg"
              title="Berries are Packed with Fiber"
            >
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/61dhEF0XfkS._AC_UX695_.jpg"
                className="preload-img img-fluid rounded-xs"
                alt="img"
              />
              <p className="font-600 pb-1">Berry</p>
            </a>
            <a
              className="col"
              data-gallery="gallery-1"
              href="images/pictures/6t.jpg"
              title="A beautiful Retro Camera"
            >
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/61dhEF0XfkS._AC_UX695_.jpg"
                className="preload-img img-fluid rounded-xs"
                alt="img"
              />
              <p className="font-600 pb-1">Camera</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryContainer;
