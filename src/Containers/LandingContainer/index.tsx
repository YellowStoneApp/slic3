import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { Routes } from '../../Navigation/Routes';
import { identityService, iRegisteredCustomer } from '../../Utils/Apis/Identity.service';

const Landing = () => {
    const [authCustomer, setAuthCustomer] = useState<iRegisteredCustomer | undefined>(undefined);
    const getAuthCustomer = async () => {
        try {
            const customer = await identityService.getCurrentCustomer();
            setAuthCustomer(customer);
        } catch (error) {
            // this isn't an error. If we don't get anything back that really means no one is logged in.
            // swallow error
        }
    };

    useEffect(() => {
        getAuthCustomer();
    }, []);
    return (
        <>
            {authCustomer ? (
                <Redirect to={{ pathname: Routes.Landing, search: `?id=${authCustomer.identityKey}` }} />
            ) : (
                <div className="page-content pb-0">
                    <div className="card" data-card-height="cover">
                        {/* <!-- shows in light mode--> */}
                        <div className="show-on-theme-light card-center text-center">
                            <img className="preload-img" src="images/preload-logo.png" width="90" />
                            <h1 className="color-black font-40 font-800 mt-3">Welcome</h1>
                            <p className="color-black opacity-50">More than the thought - Get what counts</p>

                            <p className="boxed-text-xl font-14 font-400 line-height-l color-black">Get what you want. It's that simple</p>
                            <a href={Routes.Signup} data-back-button className="btn btn-m font-900 text-uppercase rounded-l btn-center-l bg-highlight">
                                Get Started
                            </a>
                        </div>

                        {/* <!-- shows in dark mode--> */}
                        <div className="show-on-theme-dark card-center text-center">
                            <img className="preload-img" src="images/preload-logo.png" width="90" />
                            <h1 className="color-white font-40 mt-3">Welcome</h1>
                            <p className="color-black opacity-50">More than the thought - Get what counts</p>

                            <p className="boxed-text-xl font-14 line-height-l color-white">Get what you want. It's that simple</p>
                            <a href={Routes.Signup} data-back-button className="btn btn-m font-900 text-uppercase rounded-l btn-center-l bg-highlight">
                                Get Started
                            </a>
                        </div>

                        <div className="card-overlay bg-theme opacity-85"></div>
                        <div className="card-overlay-infinite preload-img" data-src="./_bg-infinite.jpg"></div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Landing;
