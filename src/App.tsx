import * as React from 'react';

/** Components */
import AppRouter from './Navigation/Routes';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ErrorPopup from './Components/ErrorPopup';

import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'leaflet/dist/leaflet.css';
import './assets/css/index.css';

import 'swiper/css/swiper.min.css';
import 'aos/dist/aos.css';

const App: React.FC = () => {
    return (
        <>
            {/* <Header isLoggedIn={isLoggedIn} /> */}
            {/* <Footer /> */}
            {/* <!-- Error Menu --> */}
            <ErrorPopup />
            <AppRouter />
        </>
    );
};

export default App;
