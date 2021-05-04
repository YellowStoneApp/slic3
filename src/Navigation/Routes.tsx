import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

/** Container components */
import GalleryContainer from "../Containers/GalleryContainer";
import LoginContainer from "../Containers/LoginContainer";
import SignUpContainer from "../Containers/SignUpContainer";
import ConfirmEmailContainer from "../Containers/ConfirmEmailContainer";
import ForgotPasswordContainer from "../Containers/ForgotPasswordContainer";
import ResetPasswordContainer from "../Containers/ResetPasswordContainer";
import WalletLoginContainer from "../Containers/WalletLoginContainer";
import SearchContainer from "../Containers/SearchContainer";
import CreateContainer from "../Containers/CreateContainer";
import CreateAccountContainer from "../Containers/CreateAccountContainer";

/** private route component */
import PrivateRoute from "./PrivateRoute";
import ProfileContainer from "../Containers/ProfileContainer";

export enum Routes {
  Gallery = "/",
  VerifyEmail = "/verify-code",
  Login = "/login",
  Signup = "/signup",
  ResetPassword = "/reset-password",
  ForgotPassword = "/forgot-password",
  WalletLogin = "/wallet-login",
  Search = "/search",
  Create = "/create",
  CreateAccount = "/create-account",
  Profile = "/profile",
}

class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <PrivateRoute
            exact={true}
            path={Routes.Gallery}
            component={GalleryContainer}
          />
          <PrivateRoute
            exact={true}
            path={Routes.Profile}
            component={ProfileContainer}
          />
          <Route
            exact={true}
            path={Routes.Create}
            component={CreateContainer}
          />
          <Route
            exact={true}
            path={Routes.CreateAccount}
            component={CreateAccountContainer}
          />
          <Route
            exact={true}
            path={Routes.Search}
            component={SearchContainer}
          />
          <Route
            exact={true}
            path={Routes.WalletLogin}
            component={WalletLoginContainer}
          />
          <Route exact={true} path={Routes.Login} component={LoginContainer} />
          <Route
            exact={true}
            path={Routes.Signup}
            component={SignUpContainer}
          />
          <Route
            exact={true}
            path={Routes.VerifyEmail}
            component={ConfirmEmailContainer}
          />
          <Route
            exact={true}
            path={Routes.ResetPassword}
            component={ResetPasswordContainer}
          />
          <Route
            exact={true}
            path={Routes.ForgotPassword}
            component={ForgotPasswordContainer}
          />
        </React.Fragment>
      </Router>
    );
  }
}

export default AppRouter;
