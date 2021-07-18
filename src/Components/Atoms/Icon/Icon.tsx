import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';

const useStyles = makeStyles(() => ({
    extraSmall: {
        fontSize: 10,
    },
    small: {
        fontSize: 20,
    },
    medium: {
        fontSize: 30,
    },
    large: {
        fontSize: 40,
    },
}));

interface IconProps {
    /**
     * External classes
     */
    className?: string;
    /**
     * The classes of the font icon
     */
    fontIconClass: string;
    /**
     * Source set for the responsive images
     */
    size?: 'extraSmall' | 'small' | 'medium' | 'large';
    /**
     * Color of the icon
     */
    fontIconColor?: string;
    // All other props
    [x: string]: any;
}

/**
 * Component to display the icon
 *
 * @param {Object} props
 */
const Icon = ({ fontIconClass, size = 'small', fontIconColor, className, ...rest }: IconProps): JSX.Element => {
    const classes = useStyles();

    return (
        <NoSsr>
            <i className={clsx('icon', fontIconClass, classes[size], className)} style={{ color: fontIconColor }} {...rest} />
        </NoSsr>
    );
};

export default Icon;
