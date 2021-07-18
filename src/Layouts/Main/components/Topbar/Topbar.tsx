import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Hidden, List, ListItem, ListItemIcon, Popover, Typography, IconButton, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import { Image, DarkModeToggler } from '../../../../Components/Atoms';
import { Routes } from '../../../../Navigation/Routes';
import { Hub } from 'aws-amplify';

const useStyles = makeStyles((theme) => ({
    flexGrow: {
        flexGrow: 1,
    },
    navigationContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    toolbar: {
        zIndex: 999,
        maxWidth: 1236,
        width: '100%',
        margin: '0 auto',
        padding: theme.spacing(0, 2),
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(0, 8),
        },
    },
    navLink: {
        '&:hover': {
            color: theme.palette.primary.dark,
        },
    },
    listItem: {
        cursor: 'pointer',
        '&:hover > .menu-item, &:hover svg': {
            color: theme.palette.primary.dark,
        },
        '&.menu-item--no-dropdown': {
            paddingRight: 0,
        },
    },
    listItemActive: {
        '&> .menu-item': {
            color: theme.palette.primary.dark,
        },
    },
    listItemText: {
        flex: '0 0 auto',
        marginRight: theme.spacing(2),
        whiteSpace: 'nowrap',
    },
    listItemButton: {
        whiteSpace: 'nowrap',
    },
    listItemIcon: {
        minWidth: 'auto',
    },
    popover: {
        padding: theme.spacing(4),
        border: theme.spacing(2),
        boxShadow: '0 0.5rem 2rem 2px rgba(116, 123, 144, 0.09)',
        minWidth: 350,
        marginTop: theme.spacing(2),
    },
    iconButton: {
        marginLeft: theme.spacing(2),
        padding: 0,
        '&:hover': {
            background: 'transparent',
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
        color: theme.palette.primary.dark,
    },
    logoContainer: {
        width: 100,
        height: 28,
        [theme.breakpoints.up('md')]: {
            width: 120,
            height: 32,
        },
    },
    logoImage: {
        width: '100%',
        height: '100%',
    },
    menu: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    menuItem: {
        marginRight: theme.spacing(5),
        '&:last-child': {
            marginRight: 0,
        },
    },
    menuGroupItem: {
        paddingTop: 0,
    },
    menuGroupTitle: {
        textTransform: 'uppercase',
    },
}));

interface Props {
    className?: string;
    onSidebarOpen: Function;
    pages: PagesProps;
    themeMode: string;
    themeToggler: Function;
}

const Topbar = ({ themeMode, themeToggler, onSidebarOpen, pages, className, ...rest }: Props): JSX.Element => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState<any>(null);
    const [openedPopoverId, setOpenedPopoverId] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>, popoverId: string | null): void => {
        setAnchorEl(event.target);
        setOpenedPopoverId(popoverId);
    };

    const handleClose = (): void => {
        setAnchorEl(null);
        setOpenedPopoverId(null);
    };

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

    const landings = pages.landings;
    const supportedPages = pages.pages;
    const account = pages.account;

    const MenuGroup = ({ item }: MenuGroupProps): JSX.Element => (
        <List disablePadding>
            <ListItem disableGutters>
                <Typography variant="body2" color="primary" className={classes.menuGroupTitle}>
                    {item.groupTitle}
                </Typography>
            </ListItem>
            {item.pages.map((page, i) => (
                <ListItem disableGutters key={i} className={classes.menuGroupItem}>
                    <Typography
                        variant="body1"
                        component={'a'}
                        href={page.href}
                        className={clsx(classes.navLink, 'submenu-item')}
                        color="textSecondary"
                        onClick={handleClose}
                    >
                        {page.title}
                    </Typography>
                </ListItem>
            ))}
        </List>
    );

    const LandingPages = (): JSX.Element => {
        const { services, apps, web } = landings.children;
        return (
            <div className={classes.menu}>
                <div className={classes.menuItem}>
                    <MenuGroup item={services} />
                    <MenuGroup item={apps} />
                </div>
                <div className={classes.menuItem}>
                    <MenuGroup item={web} />
                </div>
            </div>
        );
    };

    const SupportedPages = (): JSX.Element => {
        const { career, helpCenter, company, contact, blog, portfolio } = supportedPages.children;
        return (
            <div className={classes.menu}>
                <div className={classes.menuItem}>
                    <MenuGroup item={career} />
                    <MenuGroup item={helpCenter} />
                </div>
                <div className={classes.menuItem}>
                    <MenuGroup item={company} />
                    <MenuGroup item={contact} />
                </div>
                <div className={classes.menuItem}>
                    <MenuGroup item={blog} />
                    <MenuGroup item={portfolio} />
                </div>
            </div>
        );
    };

    const AccountPages = (): JSX.Element => {
        const { signout } = account.children;
        return (
            <div className={classes.menu}>
                <div className={classes.menuItem}>
                    <MenuGroup item={signout} />
                </div>
            </div>
        );
    };

    const renderPages = (id: string): JSX.Element | null => {
        // if (id === 'landing-pages') {
        //     return <LandingPages />;
        // }
        // if (id === 'supported-pages') {
        //     return <SupportedPages />;
        // }
        if (id === 'account') {
            return <AccountPages />;
        }
        return null;
    };

    return (
        <Toolbar disableGutters className={classes.toolbar} {...rest}>
            <div className={classes.logoContainer}>
                <a href="/" title="moreThanTheThought">
                    MoreThanTheThought
                    {/* <Image
                        className={classes.logoImage}
                        src={'../../../../assets/images/icon.png'}
                        // src={
                        //     themeMode === 'light'
                        //         ? 'https://assets.maccarianagency.com/the-front/logos/logo.svg'
                        //           : 'https://assets.maccarianagency.com/the-front/logos/logo-negative.svg'
                        // }
                        alt="moreThanTheThought"
                        lazy={false}
                    /> */}
                </a>
            </div>
            <div className={classes.flexGrow} />
            <Hidden smDown>
                <List disablePadding className={classes.navigationContainer}>
                    {isLoggedIn ? (
                        [account].map((page, i) => (
                            <div key={page.id}>
                                <ListItem
                                    aria-describedby={page.id}
                                    onClick={(e) => handleClick(e, page.id)}
                                    className={clsx(classes.listItem, openedPopoverId === page.id ? classes.listItemActive : '')}
                                >
                                    <Typography variant="body1" color="textPrimary" className={clsx(classes.listItemText, 'menu-item')}>
                                        {page.title}
                                    </Typography>
                                    <ListItemIcon className={classes.listItemIcon}>
                                        <ExpandMoreIcon className={openedPopoverId === page.id ? classes.expandOpen : ''} fontSize="small" />
                                    </ListItemIcon>
                                </ListItem>
                                <Popover
                                    elevation={1}
                                    id={page.id}
                                    open={openedPopoverId === page.id}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    classes={{ paper: classes.popover }}
                                >
                                    <div>{renderPages(page.id)}</div>
                                </Popover>
                            </div>
                        ))
                    ) : (
                        <ListItem className={clsx(classes.listItem, 'menu-item--no-dropdown')}>
                            <Button variant="contained" color="primary" component="a" target="blank" href={Routes.Login} className={classes.listItemButton}>
                                Get Started
                            </Button>
                        </ListItem>
                    )}
                </List>
            </Hidden>
            <Hidden mdUp>
                <DarkModeToggler themeMode={themeMode} onClick={() => themeToggler()} />
                <IconButton className={classes.iconButton} onClick={() => onSidebarOpen()} aria-label="Menu">
                    <MenuIcon />
                </IconButton>
            </Hidden>
        </Toolbar>
    );
};

export default Topbar;
