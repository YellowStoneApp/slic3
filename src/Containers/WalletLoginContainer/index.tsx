import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { useRecoilState } from "recoil";
import { identityCustomerState } from "../../Hooks/currentIdentityCustomer.hook";
import { useCurrentWalletUser } from "../../Hooks/currentWalletUser.hook";
import { errorState } from "../../Hooks/error.hook";
import { Routes } from "../../Navigation/Routes";

const LoggedIn = () => {
  const cu = useCurrentWalletUser();
  const [identityCustomer] = useRecoilState(identityCustomerState);

  // todo WTF are you doing here??? This way adapted from a tutorial and this is some broke ass functionality.
  let redirect = Routes.CreateAccount;
  if (identityCustomer.user) {
    redirect = Routes.Gallery;
  }
  return !cu.loggedIn ? null : <Redirect to={{ pathname: redirect }} />;
};

const NotLoggedIn = () => {
  const cu = useCurrentWalletUser();
  console.log(cu);
  console.log(process.env.REACT_APP_WALLET_DISCOVERY);
  return cu.loggedIn ? null : (
    <div>
      <div className="page-content header-clear-medium">
        <div className="card card-style">
          <div className="content mt-4 mb-0">
            <h1 className="text-center font-900 font-40 text-uppercase mb-0">
              Wallet Sign In
            </h1>
            <p className="bottom-0 text-center color-highlight font-11">
              You need to sign into a wallet provider to use FLOW on our
              platform.
            </p>
            <a
              onClick={cu.logIn}
              className="btn btn-icon btn-m btn-full shadow-l rounded-s bg-facebook text-uppercase font-900 text-start"
            >
              <i className="fab text-center"></i>Login to Wallet
            </a>
            <a
              onClick={cu.signUp}
              className="btn btn-icon btn-m btn-full shadow-l rounded-s bg-twitter text-uppercase font-900 text-start mt-2 "
            >
              <i className="fab text-center"></i>Sign up for Wallet
            </a>
            <div className="divider mt-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WalletLoginContainer = () => {
  return (
    <>
      <LoggedIn />
      <NotLoggedIn />
    </>
  );
};

export default WalletLoginContainer;
