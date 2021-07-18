import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CardBase, DescriptionListIcon } from '../../Organisms';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
    },
}));

interface CardCategoryProps {
    /**
     * External classes
     */
    className?: string;
    /**
     * Icon to show inside the category card
     */
    icon: JSX.Element;
    /**
     * Category title to show inside the category card
     */
    title: string;
    /**
     * The content alignment
     */
    align?: 'left' | 'right' | 'center';
    // All other props
    [x: string]: any;
}

/**
 * Component to display the category card
 *
 * @param {Object} props
 */
const CardCategory = ({ icon, title, align = 'center', className, ...rest }: CardCategoryProps): JSX.Element => {
    const classes = useStyles();

    return (
        <CardBase className={clsx(classes.root, className)} {...rest}>
            <DescriptionListIcon icon={icon} title={title} align={align} />
        </CardBase>
    );
};

export default CardCategory;
