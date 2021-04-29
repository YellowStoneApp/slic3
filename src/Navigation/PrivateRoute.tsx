import React from "react";
import { Route, Redirect } from "react-router-dom";

import { validateToken } from "../Utils/validate.token";

import { AUTH_USER_ACCESS_TOKEN_KEY } from "../Utils/constants";
import { useCurrentUser } from "../Hooks/currentUser.hook";
import { Routes } from "./Routes";

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
  const customerLoggedIntoWallet = useCurrentUser().loggedIn;

  const RouteTo = (props: any) => {
    if (checkUserAuth && customerLoggedIntoWallet) {
      console.log("logged in to both identity and wallet");
      return <Component {...props} />;
    } else if (checkUserAuth) {
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
