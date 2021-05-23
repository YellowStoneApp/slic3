import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

/** Container components */
import GalleryContainer from '../Containers/GalleryContainer';
import LoginContainer from '../Containers/LoginContainer';
import SignUpContainer from '../Containers/SignUpContainer';
import ConfirmEmailContainer from '../Containers/ConfirmEmailContainer';
import ForgotPasswordContainer from '../Containers/ForgotPasswordContainer';
import ResetPasswordContainer from '../Containers/ResetPasswordContainer';
import SearchContainer from '../Containers/SearchContainer';
import Landing from '../Containers/LandingContainer';

/** private route component */
import SignInResponse from '../Containers/SignInResponse';
import Signout from '../Containers/SignoutContainer';

export enum Routes {
    Gallery = '/gallery',
    VerifyEmail = '/verify-code',
    Login = '/login',
    Signup = '/signup',
    Signout = '/signout',
    ResetPassword = '/reset-password',
    ForgotPassword = '/forgot-password',
    Search = '/search',
    CreateAccount = '/create-account',
    Profile = '/profile',
    SignInResponse = '/signin_response',
    Landing = '/',
}

class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Route exact={true} path={Routes.Landing} component={Landing} />
                    <Route exact={true} path={Routes.Signout} component={Signout} />
                    <Route exact={true} path={Routes.Gallery} component={GalleryContainer} />
                    <Route exact={false} path={Routes.SignInResponse} component={SignInResponse} />
                    <Route exact={true} path={Routes.Search} component={SearchContainer} />
                    <Route exact={true} path={Routes.Login} component={LoginContainer} />
                    <Route exact={true} path={Routes.Signup} component={SignUpContainer} />
                    <Route exact={true} path={Routes.VerifyEmail} component={ConfirmEmailContainer} />
                    <Route exact={true} path={Routes.ResetPassword} component={ResetPasswordContainer} />
                    <Route exact={true} path={Routes.ForgotPassword} component={ForgotPasswordContainer} />
                </React.Fragment>
            </Router>
        );
    }
}

export default AppRouter;
