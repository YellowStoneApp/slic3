import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Divider } from '@material-ui/core';
import { Topbar, Footer, Sidebar } from './components';
import { Routes } from '../../Navigation/Routes';
import { Hub } from 'aws-amplify';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
}));

interface Props {
    children: React.ReactNode;
    themeToggler: Function;
    themeMode: string;
}

const Main = ({ children, themeToggler, themeMode }: Props): JSX.Element => {
    const classes = useStyles();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    const pages = {
        // landings: {
        //     title: 'Landings',
        //     id: 'landing-pages',
        //     children: {
        //         services: {
        //             groupTitle: 'Services',
        //             pages: [
        //                 {
        //                     title: 'Coworking',
        //                     href: '/coworking',
        //                 },
        //                 {
        //                     title: 'Rental',
        //                     href: '/rental',
        //                 },
        //                 {
        //                     title: 'Job Listing',
        //                     href: '/job-listing',
        //                 },
        //                 {
        //                     title: 'E-Learning',
        //                     href: '/e-learning',
        //                 },
        //                 {
        //                     title: 'E-commerce',
        //                     href: '/e-commerce',
        //                 },
        //                 {
        //                     title: 'Expo',
        //                     href: '/expo',
        //                 },
        //             ],
        //         },
        //         apps: {
        //             groupTitle: 'Apps',
        //             pages: [
        //                 {
        //                     title: 'Desktop App',
        //                     href: '/desktop-app',
        //                 },
        //                 {
        //                     title: 'Mobile App',
        //                     href: '/mobile-app',
        //                 },
        //             ],
        //         },
        //         web: {
        //             groupTitle: 'Web',
        //             pages: [
        //                 {
        //                     title: 'Marketing',
        //                     href: '/',
        //                 },
        //                 {
        //                     title: 'Overview',
        //                     href: '/home',
        //                 },
        //                 {
        //                     title: 'Basic',
        //                     href: '/web-basic',
        //                 },
        //                 {
        //                     title: 'Service',
        //                     href: '/service',
        //                 },
        //                 {
        //                     title: 'Startup',
        //                     href: '/startup',
        //                 },
        //                 {
        //                     title: 'Enterprise',
        //                     href: '/enterprise',
        //                 },
        //                 {
        //                     title: 'Cloud Hosting',
        //                     href: '/cloud-hosting',
        //                 },
        //                 {
        //                     title: 'Agency',
        //                     href: '/agency',
        //                 },
        //                 {
        //                     title: 'Design Company',
        //                     href: '/design-company',
        //                 },
        //                 {
        //                     title: 'Logistics',
        //                     href: '/logistics',
        //                 },
        //             ],
        //         },
        //     },
        // },
        // pages: {
        //     title: 'Pages',
        //     id: 'supported-pages',
        //     children: {
        //         career: {
        //             groupTitle: 'Career',
        //             pages: [
        //                 {
        //                     title: 'Lising',
        //                     href: '/career-listing',
        //                 },
        //                 {
        //                     title: 'Lising Minimal',
        //                     href: '/career-listing-minimal',
        //                 },
        //                 {
        //                     title: 'Opening',
        //                     href: '/career-opening',
        //                 },
        //             ],
        //         },
        //         helpCenter: {
        //             groupTitle: 'Help center',
        //             pages: [
        //                 {
        //                     title: 'Overview',
        //                     href: '/help-center',
        //                 },
        //                 {
        //                     title: 'Article',
        //                     href: '/help-center-article',
        //                 },
        //             ],
        //         },
        //         company: {
        //             groupTitle: 'Company',
        //             pages: [
        //                 {
        //                     title: 'About',
        //                     href: '/about',
        //                 },
        //                 {
        //                     title: 'About (Cover)',
        //                     href: '/about-side-cover',
        //                 },
        //                 {
        //                     title: 'Pricing',
        //                     href: '/pricing',
        //                 },
        //                 {
        //                     title: 'Terms',
        //                     href: '/company-terms',
        //                 },
        //             ],
        //         },
        //         contact: {
        //             groupTitle: 'Contact',
        //             pages: [
        //                 {
        //                     title: 'Reach View',
        //                     href: '/contact-page',
        //                 },
        //                 {
        //                     title: 'Sidebar Map',
        //                     href: '/contact-sidebar-map',
        //                 },
        //                 {
        //                     title: 'Cover',
        //                     href: '/contact-page-cover',
        //                 },
        //             ],
        //         },
        //         blog: {
        //             groupTitle: 'Blog',
        //             pages: [
        //                 {
        //                     title: 'Newsroom',
        //                     href: '/blog-newsroom',
        //                 },
        //                 {
        //                     title: 'Reach View',
        //                     href: '/blog-reach-view',
        //                 },
        //                 {
        //                     title: 'Search',
        //                     href: '/blog-search',
        //                 },
        //                 {
        //                     title: 'Article',
        //                     href: '/blog-article',
        //                 },
        //             ],
        //         },
        //         portfolio: {
        //             groupTitle: 'Portfolio',
        //             pages: [
        //                 {
        //                     title: 'Basic',
        //                     href: '/portfolio-page',
        //                 },
        //                 {
        //                     title: 'Masonry',
        //                     href: '/portfolio-masonry',
        //                 },
        //                 {
        //                     title: 'Grid View',
        //                     href: '/portfolio-grid',
        //                 },
        //                 {
        //                     title: 'Parallax Effect',
        //                     href: '/agency',
        //                 },
        //             ],
        //         },
        //     },
        // },
        account: {
            title: 'Account',
            id: 'account',
            children: {
                signout: {
                    groupTitle: '',
                    pages: [
                        {
                            title: 'Sign Out',
                            href: Routes.Signout,
                        },
                    ],
                },
            },
        },
    };

    const [openSidebar, setOpenSidebar] = useState<boolean>(false);

    const handleSidebarOpen = (): void => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = (): void => {
        setOpenSidebar(false);
    };

    const open = isMd ? false : openSidebar;

    /**
     * This probably shouldn't be in the Topbar component...
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
        <div
            className={clsx({
                [classes.root]: true,
            })}
        >
            <Topbar isLoggedIn={isLoggedIn} onSidebarOpen={handleSidebarOpen} pages={pages} themeMode={themeMode} themeToggler={themeToggler} />
            <Sidebar onClose={handleSidebarClose} isLoggedIn={isLoggedIn} open={open} variant="temporary" pages={pages} />
            <main>
                <Divider />
                {children}
            </main>
            <Footer pages={pages} />
        </div>
    );
};

export default Main;
