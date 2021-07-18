import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Typography, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { CardBase } from '../../Organisms';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
    },
}));

interface CardReviewProps {
    /**
     * External classes
     */
    className?: string;
    /**
     * Icon to show inside the review card
     */
    icon: JSX.Element;
    /**
     * Review text to show inside the review card
     */
    text: string;
    /**
     * Reviewer photo to show inside the review card.Should be an object with src and srcSet properties
     */
    authorPhoto: object;
    /**
     * Reviewer name to show inside the review card
     */
    authorName: string;
    /**
     * Reviewer title to show inside the review card
     */
    authorTitle?: string;
    /**
     * Alignment of the content
     */
    align?: 'left' | 'right' | 'center';
    /**
     * Review text variant
     */
    textVariant?:
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
     * Additional props to pass to the text Typography component
     */
    textProps?: object;
    /**
     * Additional props to pass to the list item primary text Typography component
     */
    listItemPrimaryTypographyProps?: object;
    /**
     * Additional props to pass to the list item secondary text Typography component
     */
    listItemSecondaryTypographyProps?: object;
    // All other props
    [x: string]: any;
}

/**
 * Component to display the review card
 *
 * @param {Object} props
 */
const CardReview = ({
    icon,
    text,
    authorPhoto,
    authorName,
    authorTitle,
    align = 'center',
    textVariant = 'h6',
    className,
    textProps = {},
    listItemPrimaryTypographyProps = {},
    listItemSecondaryTypographyProps = {},
    ...rest
}: CardReviewProps): JSX.Element => {
    const classes = useStyles();

    let justifyGrid: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | undefined = 'center';
    if (align === 'left') {
        justifyGrid = 'flex-start';
    } else if (align === 'right') {
        justifyGrid = 'flex-end';
    }

    return (
        <CardBase className={clsx('card-review', classes.root, className)} {...rest}>
            <Grid container spacing={2} className="card-review__wrapper">
                <Grid item container justify={justifyGrid} xs={12} className="card-review__icon-wrapper">
                    {icon}
                </Grid>
                <Grid item xs={12} className="card-review__text-wrapper">
                    <Typography variant={textVariant} align={align} component="p" {...textProps}>
                        {text}
                    </Typography>
                </Grid>
                <Grid item xs={12} className="card-review__lits-container">
                    <Grid container justify={justifyGrid} className="card-review__list-wrapper">
                        <List disablePadding className="card-review__list">
                            <ListItem className="card-review__list-item">
                                <ListItemAvatar className="card-review__list-item-avatar">
                                    <Avatar {...authorPhoto} alt={authorName} className="card-review__avatar" />
                                </ListItemAvatar>
                                <ListItemText
                                    className="card-review__list-item-text"
                                    primary={authorName}
                                    secondary={authorTitle}
                                    primaryTypographyProps={{
                                        ...listItemPrimaryTypographyProps,
                                    }}
                                    secondaryTypographyProps={{
                                        ...listItemSecondaryTypographyProps,
                                    }}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Grid>
        </CardBase>
    );
};

export default CardReview;
