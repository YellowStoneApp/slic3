import * as React from 'react';

/** Components */
import AppRouter from './Navigation/Routes';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ErrorPopup from './Components/ErrorPopup';
import { Hub } from 'aws-amplify';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    /**
     * This probably shouldn't be in the main App component.
     *
     * We also should probably not be passing state around like this with the UseState
     *
     * We could use recoil and set state that way and consume the recoil component
     * from whereever we need it.
     */
    Hub.listen('auth', (data) => {
        switch (data.payload.event) {
            case 'signIn':
                setIsLoggedIn(true);
                break;
            case 'signUp':
                setIsLoggedIn(true);
                break;
            case 'hasAuthCustomer':
                setIsLoggedIn(true);
                break;
            case 'signOut':
                setIsLoggedIn(false);
                break;
            case 'signIn_failure':
                setIsLoggedIn(false);
                break;
            case 'configured':
                console.log('the Auth module is configured');
        }
    });
    Hub.listen('identity', (data) => {
        switch (data.payload.event) {
            case 'hasAuthCustomer':
                setIsLoggedIn(true);
                break;
            case 'noAuthCustomer':
                setIsLoggedIn(false);
                break;
        }
    });

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            {/* <Footer /> */}
            {/* <!-- Error Menu --> */}
            <ErrorPopup />
            <AppRouter />
        </>
    );
};

export default App;
