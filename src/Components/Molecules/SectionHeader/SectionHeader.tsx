import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            marginBottom: theme.spacing(4),
        },
    },
    disableGutter: {
        marginBottom: 0,
    },
    title: {
        fontWeight: 'bold',
    },
    cta: {
        marginLeft: theme.spacing(1),
        '&:first-child': {
            marginLeft: theme.spacing(0),
        },
    },
}));

interface SectionHeaderProps {
    /**
     * External classes
     */
    className?: string;
    /**
     * Title of the section header
     */
    title: string | JSX.Element;
    /**
     * Subtitle of the section header
     */
    subtitle?: string | JSX.Element;
    /**
     * Label title of the section header
     */
    label?: string;
    /**
     * The overline component in the section header
     */
    overline?: JSX.Element;
    /**
     * Array of the CTAs
     */
    ctaGroup?: Array<JSX.Element>;
    /**
     * Whether to fade up on scroll
     */
    fadeUp?: boolean;
    /**
     * Header content (title, subtitle, CTAs) alignment
     */
    align?: 'right' | 'left' | 'center';
    /**
     * Whether to disable bottom margin of the section
     */
    disableGutter?: boolean;
    /**
     * Styles classes to be attached to the title from the parent component
     */
    titleClasses?: string;
    /**
     * Title variant
     */
    titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    /**
     * SubTitle variant
     */
    subtitleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2';
    /**
     * SubTitle color
     */
    subtitleColor?: 'textPrimary' | 'textSecondary' | 'primary' | 'secondary';
    /**
     * Additional properties to pass to the label Typography component
     */
    labelProps?: object;
    /**
     * Additional properties to pass to the title Typography component
     */
    titleProps?: object;
    /**
     * Additional properties to pass to the subtitle Typography component
     */
    subtitleProps?: object;
    // All other props
    [x: string]: any;
}

/**
 * Component to display the section headers
 *
 * @param {Object} props
 */
const SectionHeader = ({
    title,
    titleVariant = 'h4',
    subtitleVariant,
    subtitle,
    subtitleColor,
    label,
    overline,
    fadeUp,
    align,
    ctaGroup,
    disableGutter,
    titleClasses,
    className,
    labelProps = {},
    titleProps = {},
    subtitleProps = {},
    ...rest
}: SectionHeaderProps): JSX.Element => {
    const classes = useStyles();
    let justifyGrid: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | undefined = 'center';
    if (align === 'left') {
        justifyGrid = 'flex-start';
    } else if (align === 'right') {
        justifyGrid = 'flex-end';
    }

    return (
        <Grid
            container
            spacing={2}
            data-aos={fadeUp ? 'fade-up' : ''}
            className={clsx('section-header', classes.root, disableGutter ? classes.disableGutter : {}, className)}
            {...rest}
        >
            {overline && (
                <Grid item container justify={justifyGrid} xs={12} className="section-header__overline-wrapper">
                    {overline}
                </Grid>
            )}
            {label && (
                <Grid item xs={12} className="section-header__label-wrapper">
                    <Typography variant="overline" color="primary" component="p" align={align || 'center'} {...labelProps}>
                        {label}
                    </Typography>
                </Grid>
            )}
            <Grid item xs={12} className="section-header__title-wrapper">
                <Typography
                    variant={titleVariant}
                    align={align || 'center'}
                    className={clsx('section-header__title', classes.title, titleClasses ? titleClasses : {})}
                    color="textPrimary"
                    {...titleProps}
                >
                    {title}
                </Typography>
            </Grid>
            {subtitle && (
                <Grid item xs={12} className="section-header__subtitle-wrapper">
                    <Typography
                        variant={subtitleVariant || 'h6'}
                        align={align || 'center'}
                        color={subtitleColor || 'textSecondary'}
                        className="section-header__subtitle"
                        {...subtitleProps}
                    >
                        {subtitle}
                    </Typography>
                </Grid>
            )}
            {ctaGroup && ctaGroup.length && (
                <Grid item xs={12} className="section-header__cta-wrapper">
                    <Grid container justify={justifyGrid} alignItems="center" wrap="nowrap" className="section-header__cta-container">
                        {ctaGroup.map((item, index) => (
                            <div key={index} className={clsx('section-header__cta-item-wrapper', classes.cta)}>
                                {item}
                            </div>
                        ))}
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

export default SectionHeader;
