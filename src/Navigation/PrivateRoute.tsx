import React from "react";
import { Route, Redirect } from "react-router-dom";

import { validateToken } from "../Utils/validate.token";

import { AUTH_USER_ACCESS_TOKEN_KEY } from "../Utils/constants";
import { useCurrentWalletUser } from "../Hooks/currentWalletUser.hook";
import { Routes } from "./Routes";
import { identityCustomerState } from "../Hooks/currentIdentityCustomer.hook";
import { useRecoilState } from "recoil";

/**
 * This route blocks access to places where you need to be logged in with our IdentityProvider to use
 * @param param0
 * @returns
 */
const PrivateRoute = ({
  component: Component,
  ...rest
}: any & { component: any }) => {
  const token = localStorage.getItem(AUTH_USER_ACCESS_TOKEN_KEY);
  const checkUserAuth = validateToken(token);
  const customerLoggedIntoWallet = useCurrentWalletUser().loggedIn;
  const [identityCustomer] = useRecoilState(identityCustomerState);

  const RouteTo = (props: any) => {
    if (identityCustomer.loggedIn && customerLoggedIntoWallet) {
      console.log("logged in to both identity and wallet");
      return <Component {...props} />;
    } else if (identityCustomer.loggedIn) {
      // haven't logged into wallet
      console.log(
        "not logged into wallet. Redirecting to ",
        Routes.WalletLogin
      );
      return <Redirect to={{ pathname: Routes.WalletLogin }} />;
    }
    console.log("not logged in anywhere");
    return <Redirect to={{ pathname: "/login" }} />;
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        return RouteTo(props);
      }}
    />
  );
};

export default PrivateRoute;
