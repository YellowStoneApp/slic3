import React from "react";
import { useHistory } from "react-router-dom";
import { Routes } from "../../Navigation/Routes";
import { identityService } from "../../Utils/Apis/Identity.service";
import { tamarakService } from "../../Utils/Apis/tamarak.service";
import { useCurrentWalletUser } from "../../Hooks/currentWalletUser.hook";

const GalleryContainer = () => {
  const history = useHistory();
  const customer = useCurrentWalletUser();

  const signout = async () => {
    console.log("signing out");
    await identityService.signOut();
    console.log("redirecting");
    history.push(Routes.Login);
  };

  const healthCheck = async () => {
    await tamarakService.dummyCall();
  };

  const getShouts = async () => {
    const response = await tamarakService.getShouts();
    console.log(response);
  };

  return (
    <div className="container">
      <div>
        <h1>You in a private spot motha fucka</h1>
        {/* <Button onClick={signout}>SIGN OUT</Button>
        <Button onClick={healthCheck}>GET HEALTH</Button>
        <Button onClick={getShouts}>GET SHOUTS</Button> */}
      </div>
      <div>
        <span>{customer.addr}</span>
      </div>
      <div
        id="menu-install-pwa-ios"
        className="menu menu-box-bottom menu-box-detached rounded-l"
      >
        <div className="boxed-text-xl mt-4 pb-3">
          <img
            className="rounded-l mb-3"
            src="app/icons/icon-128x128.png"
            alt="img"
            width="90"
          />
          <h4 className="mt-3">Add Sticky on your Home Screen</h4>
          <p className="mb-0 pb-0">
            Install Sticky, and access it like a regular app. Open your Safari
            menu and tap "Add to Home Screen".
          </p>
          <div className="clearfix pt-3"></div>
          <a
            href="#"
            className="pwa-dismiss close-menu color-highlight text-uppercase font-700"
          >
            Maybe later
          </a>
        </div>
      </div>
    </div>
  );
};

export default GalleryContainer;
