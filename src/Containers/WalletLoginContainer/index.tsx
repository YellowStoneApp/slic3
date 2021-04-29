import { ContactlessOutlined } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { useCurrentUser } from "../../Hooks/currentUser.hook";
import { Routes } from "../../Navigation/Routes";

const LoggedIn = () => {
  const cu = useCurrentUser();
  return !cu.loggedIn ? null : <Redirect to={{ pathname: Routes.Gallery }} />;
};

const NotLoggedIn = () => {
  const cu = useCurrentUser();
  console.log(cu);
  return cu.loggedIn ? null : (
    <div>
      <button onClick={cu.logIn}>Log In</button>
      <button onClick={cu.signUp}>Sign Up</button>
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
