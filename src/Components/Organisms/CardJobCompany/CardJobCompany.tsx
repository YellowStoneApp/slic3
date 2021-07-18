import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Avatar } from '@material-ui/core';
import { CardBase } from '../../Organisms';
import { LearnMoreLink } from '../../Atoms';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
    },
    companyAvatar: {
        width: 60,
        height: 60,
    },
    dot: {
        display: 'inline-block',
        width: theme.spacing(1),
        height: theme.spacing(1),
        background: theme.palette.text.primary,
        borderRadius: '100%',
        marginRight: theme.spacing(1),
    },
    dotSmall: {
        width: theme.spacing(1 / 2),
        height: theme.spacing(1 / 2),
    },
    companyName: {
        fontWeight: 700,
    },
    dotMargin: {
        margin: theme.spacing(0, 1),
    },
}));

interface CardJobCompanyProps {
    /**
     * External classes
     */
    className?: string;
    /**
     * Job title of the card
     */
    jobTitle: string;
    /**
     * Job location of the card
     */
    jobLocation: string;
    /**
     * Company logo of the card
     */
    companyLogo: string;
    /**
     * Company name of the card
     */
    companyName: string;
    /**
     * Count of the jobs in the the card
     */
    jobsCount: string;
    /**
     * Company info in the card
     */
    companyInfo: string;
    // All other props
    [x: string]: any;
}

/**
 * Component to display the job card company
 *
 * @param {Object} props
 */
const CardJobCompany = ({ jobTitle, jobLocation, companyLogo, companyName, jobsCount, companyInfo, className, ...rest }: CardJobCompanyProps): JSX.Element => {
    const classes = useStyles();

    return (
        <CardBase className={clsx('card-company', classes.root, className)} align="left" {...rest}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Avatar src={companyLogo} alt={companyName} className={classes.companyAvatar} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" className={classes.companyName}>
                        {companyName}
                    </Typography>
                </Grid>
                <Grid item container alignItems="center" xs={12}>
                    <Typography component="span" variant="subtitle1" color="textPrimary">
                        {jobTitle}
                    </Typography>
                    <span className={clsx(classes.dot, classes.dotSmall, classes.dotMargin)} />
                    <Typography component="span" variant="subtitle1" color="textPrimary">
                        {jobLocation}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <LearnMoreLink title={jobsCount} variant="subtitle1" />
                </Grid>
                <Grid item xs={12}>
                    <Typography component="p" variant="body2" color="textSecondary">
                        {companyInfo}
                    </Typography>
                </Grid>
            </Grid>
        </CardBase>
    );
};

export default CardJobCompany;
