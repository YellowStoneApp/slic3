import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Section } from '../../Organisms';

const useStyles = makeStyles(() => ({
    root: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
}));

interface HeroSimpleBackgroundProps {
    /**
     * External classes
     */
    className?: string;
    /**
     * The main content
     */
    children: JSX.Element;
    /**
     * The background image of the hero
     */
    backgroundImage: string;
    /**
     * The background size of the hero
     */
    backgroundSize?: string | number;
    /**
     * The background position of the hero
     */
    backgroundPosition?: string | number;
    // All other props
    [x: string]: any;
}

const HeroSimpleBackground = ({
    children,
    backgroundSize = 'cover',
    backgroundImage,
    backgroundPosition = 'center',
    className,
    ...rest
}: HeroSimpleBackgroundProps): JSX.Element => {
    const classes = useStyles();

    const useBackground = makeStyles(() => ({
        backgroundImage: {
            backgroundImage: `url(${backgroundImage})`,
        },
        backgroundSize: {
            backgroundSize: backgroundSize,
        },
        backgroundPosition: {
            backgroundPosition: backgroundPosition,
        },
    }));
    const backgroundClasses = useBackground();

    return (
        <div
            className={clsx(
                'hero-simple-background',
                classes.root,
                className,
                backgroundClasses.backgroundImage,
                backgroundClasses.backgroundSize,
                backgroundClasses.backgroundPosition
            )}
            {...rest}
        >
            <Section className="hero-simple-background__section">{children}</Section>
        </div>
    );
};

export default HeroSimpleBackground;
