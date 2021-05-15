import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import { identityCustomerState } from "../Hooks/currentIdentityCustomer.hook";
import { Routes } from "../Navigation/Routes";

interface HeaderProps {}

const Header = (props: HeaderProps) => {
  // want a login / sign up button here to show to user if they're not logged in.
  // want to conditionally show back button if we're on a computer browser.
  const [identityCustomer] = useRecoilState(identityCustomerState);
  const [redirect, setRedirect] = useState(false);

  const redirectToSignUp = () => {
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={{ pathname: Routes.Signup }} />;
  }

  return (
    <div className="header header-fixed header-logo-center">
      <a href="index.html" className="header-title">
        Gotchu
      </a>
      <a href="#" data-back-button className="header-icon header-icon-1">
        <i className="fas fa-arrow-left"></i>
      </a>
      {identityCustomer.loggedIn ? (
        <a
          href="#"
          onClick={redirectToSignUp}
          data-toggle-theme
          className="header-icon header-icon-4"
        >
          <i className="fas fa-lightbulb"></i>
        </a>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Header;
