import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Redirect, Route } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Routes } from '../Navigation/Routes';

interface HeaderProps {
    isLoggedIn: boolean;
}

const Header = (props: HeaderProps) => {
    // want a login / sign up button here to show to user if they're not logged in.
    // want to conditionally show back button if we're on a computer browser.

    const handleSignOut = async () => {
        const response = await Auth.signOut({ global: true });
    };
    return (
        <div className="header header-fixed header-logo-app mb-3">
            <a href="index.html" className="header-title">
                More Than The Thought
            </a>
            {/* <a href="#" className="header-icon header-icon-1">
          <i className="fas fa-arrow-left"></i>
        </a> */}

            {/* <div id="header-icon-3-group">
                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                <span className="input-group-text border-0" id="search-addon">
                    <i className="fas fa-search"></i>
                </span>
            </div> */}
            {props.isLoggedIn ? (
                <div id="header-icon-2-group">
                    <button type="button" id="header-3" data-bs-toggle="dropdown" className="header-icon header-icon-2">
                        <i className="fas fa-bars"></i>
                        {/* Put notifications here */}
                        <span className="badge bg-highlight"></span>
                    </button>
                    <div className="dropdown-menu bg-theme border-0 shadow-l rounded-s me-2 mt-2" aria-labelledby="header-3">
                        {/* <p className="font-10 ps-3 pe-3 font-500 mb-0">Mini Menu</p> */}
                        <div className="list-group list-custom-small ps-2 pe-3">
                            <a href="#" onClick={handleSignOut}>
                                <i className="fa font-14 fa-sign-out-alt color-blue-dark"></i>
                                <span>Sign Out</span>
                            </a>
                        </div>
                    </div>
                </div>
            ) : (
                <div id="header-icon-2-group">
                    <a href={Routes.Login} type="button" id="header-3" className="header-icon header-icon-2">
                        <i className="fas fa-user-plus"></i>
                        {/* Put notifications here */}
                        <span className="badge bg-highlight"></span>
                    </a>
                </div>
            )}
        </div>
    );
};

export default Header;
