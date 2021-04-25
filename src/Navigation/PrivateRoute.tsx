import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import { validateToken } from "../Utils/validate.token";

import { AUTH_USER_ACCESS_TOKEN_KEY } from "../Utils/constants";

const PrivateRoute = ({
  component: Component,
  ...rest
}: any & { component: any }) => {
  const token = localStorage.getItem(AUTH_USER_ACCESS_TOKEN_KEY);
  console.log(token, "private route");
  const checkUserAuth = validateToken(token);

  return (
    <Route
      {...rest}
      render={(props) => {
        return checkUserAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        );
      }}
    />
  );
};

export default PrivateRoute;
