import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { SectionHeader, TypedText } from '../../../../Components/Molecules';
import { HeroShaped } from '../../../../Components/Organisms';
import { Routes } from '../../../../Navigation/Routes';

const useStyles = makeStyles((theme) => ({
    fontWeight900: {
        fontWeight: 900,
    },
    leftSideContent: {
        '& .section-header__cta-container': {
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column',
                '& .section-header__cta-item-wrapper': {
                    width: '100%',
                    '&:last-child': {
                        marginLeft: 0,
                        marginTop: theme.spacing(1),
                    },
                    '& .MuiButtonBase-root': {
                        width: '100%',
                    },
                },
            },
        },
    },
    heroShaped: {
        '& .hero-shaped__image': {
            backgroundColor: theme.palette.background.default,
        },
        [theme.breakpoints.down('sm')]: {
            '& .hero-shaped__image': {
                position: 'relative',
            },
            '& .hero-shaped__wrapper': {
                flexDirection: 'column',
            },
        },
    },
    imageAnimation: {
        background: `url("https://images.unsplash.com/photo-1607344645866-009c320b63e0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2500&q=80")`,
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'scroll',
        backgroundSize: '400px auto',
        animation: `$slideshow 50s linear infinite`,
        width: '600%',
        height: '600%',
        backgroundColor: theme.palette.background.default,
        top: '-25%',
        left: '-100%',
        position: 'absolute',
        [theme.breakpoints.up('sm')]: {
            backgroundSize: '800px auto',
        },
    },
    imageAnimationDark: {
        background: `url("https://images.unsplash.com/photo-1607344645866-009c320b63e0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2500&q=80")`,
    },
    '@keyframes slideshow': {
        '0%': {
            transform: 'rotate(-13deg) translateY(-25%)',
        },
        '100%': {
            transform: 'rotate(-13deg) translateY(-80%)',
        },
    },
}));

const Hero = ({ themeMode = 'light', className, ...rest }: ViewComponentProps): JSX.Element => {
    const classes = useStyles();

    const title = (
        <Typography variant="h2" component="span" className={classes.fontWeight900}>
            Get Better Gifts
            <br />
            <TypedText
                component="span"
                variant="h2"
                color="secondary"
                className={classes.fontWeight900}
                typedProps={{
                    strings: ['birthdays', 'graduations', 'holidays', 'and many more...'],
                    typeSpeed: 50,
                    loop: true,
                }}
            />
        </Typography>
    );

    const subtitle = 'Make and share free shoppable gift lists with anything you can buy online!  Never get a gift you don’t like again.';

    const buyButton = (
        <Button size="large" variant="contained" color="primary" component="a" href={Routes.Login}>
            Get started
        </Button>
    );

    const leftSideContent = (
        <SectionHeader
            title={title}
            subtitle={subtitle}
            align="left"
            titleProps={{
                variant: 'h2',
                color: 'textPrimary',
            }}
            ctaGroup={[buyButton]}
            data-aos="fade-right"
            disableGutter
            className={classes.leftSideContent}
        />
    );
    return (
        <div className={className} {...rest}>
            <HeroShaped
                className={classes.heroShaped}
                leftSide={leftSideContent}
                rightSide={<div className={clsx(classes.imageAnimation, themeMode === 'dark' ? classes.imageAnimationDark : '')} />}
            />
        </div>
    );
};

export default Hero;
