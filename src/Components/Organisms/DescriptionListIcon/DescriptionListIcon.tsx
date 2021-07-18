import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 700,
    },
}));

interface DescriptionListIconProps {
    /**
     * External classes
     */
    className?: string;
    /**
     * The title
     */
    title: string;
    /**
     * the subtitle
     */
    subtitle?: string;
    /**
     * Whether should show the alternate icon
     */
    icon: JSX.Element;
    /**
     * The alignment of the items
     */
    align?: 'left' | 'right' | 'center';
    /**
     * Title variant
     */
    titleVariant?:
        | 'inherit'
        | 'button'
        | 'overline'
        | 'caption'
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'subtitle1'
        | 'subtitle2'
        | 'body1'
        | 'body2'
        | 'srOnly'
        | undefined;
    /**
     * Subtitle variant
     */
    subtitleVariant?:
        | 'inherit'
        | 'button'
        | 'overline'
        | 'caption'
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'subtitle1'
        | 'subtitle2'
        | 'body1'
        | 'body2'
        | 'srOnly'
        | undefined;
    /**
     * Additional props to pass to the title Typography component
     */
    titleProps?: object;
    /**
     * Additional props to pass to the subtitle Typography component
     */
    subtitleProps?: object;
    // All other props
    [x: string]: any;
}

/**
 * Component to display the description list with icon
 *
 * @param {Object} props
 */
const DescriptionListIcon = ({
    title,
    subtitle,
    icon,
    align = 'center',
    titleVariant = 'h6',
    subtitleVariant = 'body1',
    className,
    titleProps = {},
    subtitleProps = {},
    ...rest
}: DescriptionListIconProps): JSX.Element => {
    const classes = useStyles();

    let gridJustify: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | undefined = 'center';

    if (align === 'left') {
        gridJustify = 'flex-start';
    } else if (align === 'right') {
        gridJustify = 'flex-end';
    }

    return (
        <Grid container spacing={2} {...rest} className={clsx('description-list-icon', className)}>
            <Grid item container justify={gridJustify} xs={12} className="description-list-icon__icon-wrapper">
                {icon}
            </Grid>
            <Grid item xs={12} className="description-list-icon__title-wrapper">
                <Typography
                    variant={titleVariant}
                    color="textPrimary"
                    align={align}
                    className={clsx(classes.title, 'description-list-icon__title')}
                    {...titleProps}
                >
                    {title}
                </Typography>
            </Grid>
            {subtitle && (
                <Grid item xs={12} className="description-list-icon__subtitle-wrapper">
                    <Typography variant={subtitleVariant} color="textSecondary" align={align} className="description-list-icon__subtitle">
                        {subtitle}
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default DescriptionListIcon;
