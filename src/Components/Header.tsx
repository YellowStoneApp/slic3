import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { useRecoilState } from "recoil";
import { identityCustomerState } from "../Hooks/currentIdentityCustomer.hook";
import { Routes } from "../Navigation/Routes";

interface HeaderProps {}

const Header = (props: HeaderProps) => {
  // want a login / sign up button here to show to user if they're not logged in.
  // want to conditionally show back button if we're on a computer browser.
  const [identityCustomer] = useRecoilState(identityCustomerState);

  return (
    <div className="header header-fixed header-logo-center">
      <a href="index.html" className="header-title">
        Gotchu
      </a>
      <a href="#" data-back-button className="header-icon header-icon-1">
        <i className="fas fa-arrow-left"></i>
      </a>
      {identityCustomer.loggedIn ? (
        <div className="col-4 pe-1">
          <a
            href={Routes.Signup}
            data-toggle-theme
            className="header-icon header-icon-4"
          >
            <i className="fas fa-user-plus"></i>
          </a>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Header;
