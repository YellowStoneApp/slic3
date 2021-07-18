import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import { Icon } from '../../Atoms';

const useStyles = makeStyles((theme) => ({
    extraSmall: {
        width: 20,
        height: 20,
    },
    small: {
        width: 50,
        height: 50,
    },
    medium: {
        width: 70,
        height: 70,
    },
    large: {
        width: 90,
        height: 90,
    },
    circle: {
        borderRadius: '100%',
    },
    square: {
        borderRadius: theme.spacing(2),
    },
}));

interface IconAlternateProps {
    /**
     * External classes
     */
    className?: string;
    /**
     * The classes of the font icon
     */
    fontIconClass: string;
    /**
     * Sizes of the icon
     */
    size?: 'extraSmall' | 'small' | 'medium' | 'large';
    /**
     * Color of the icon
     */
    color?: any;
    /**
     * The shape of the alternate icon
     */
    shape?: 'circle' | 'square';
    /**
     * Additional properties to pass to the Icon component
     */
    iconProps?: object;

    // All other props
    [x: string]: any;
}

/**
 * Component to display the alternate icon
 *
 * @param {Object} props
 */
const IconAlternate = ({ iconProps, fontIconClass, size = 'medium', color = [], shape = 'square', className, ...rest }: IconAlternateProps): JSX.Element => {
    const classes = useStyles();
    const useBackgroundStyles = makeStyles(() => ({
        background: {
            background: color[50],
        },
    }));
    const backgroundClasses = useBackgroundStyles();

    return (
        //@ts-ignore
        <Avatar className={clsx('icon-alternate', classes[size], classes[shape], backgroundClasses.background, className)} {...rest}>
            <Icon size={size} fontIconClass={fontIconClass} fontIconColor={color[500]} className="icon-alternate__icon" {...iconProps} />
        </Avatar>
    );
};

export default IconAlternate;
