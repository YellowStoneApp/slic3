import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: '100%',
    },
    dBlock: {
        display: 'block',
    },
}));

export interface ImageProps {
    /**
     * External classes
     */
    className?: string;
    /**
     * Source of the image
     */
    src: string;
    /**
     * Source set for the responsive images
     */
    srcSet?: string;
    /**
     * Image title
     */
    alt?: string;
    /**
     * Lazy loading properties
     */
    lazyProps?: object;
    /**
     * Should lazy load the image
     */
    lazy?: boolean;
    // All other props
    [x: string]: any;
}

/**
 * Component to display the images
 *
 * @param {Object} props
 */
const Image = ({
    src,
    srcSet,
    alt = '...',
    lazy = true,
    lazyProps = {
        width: 'auto',
        height: 'auto',
    },
    className,
    ...rest
}: ImageProps): JSX.Element => {
    const classes = useStyles();
    if (lazy) {
        return (
            <LazyLoadImage
                className={clsx('image', classes.root, classes.dBlock, className)}
                alt={alt}
                src={src}
                srcSet={srcSet}
                effect="opacity"
                {...lazyProps}
                {...rest}
            />
        );
    }

    return <img className={clsx('image', classes.root, className)} alt={alt} src={src} srcSet={srcSet} {...rest} />;
};

export default Image;
