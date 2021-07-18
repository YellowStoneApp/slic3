import React from 'react';
import clsx from 'clsx';
import Typed from 'react-typed';
import { Typography } from '@material-ui/core';

interface TypedTextProps {
    /**
     * External classes
     */
    className?: string;
    /**
     * react-typed properties. For more info visit https://www.npmjs.com/package/react-typed
     */
    typedProps: object;
    // All other props
    [x: string]: any;
}

/**
 * Component to display the typed animated texts
 *
 * @param {Object} props
 */
const TypedText = ({ className, typedProps, ...rest }: TypedTextProps): JSX.Element => (
    <Typography className={clsx('typed-text', className)} {...rest}>
        <Typed className="typed-text__item" {...typedProps} />
    </Typography>
);

export default TypedText;
