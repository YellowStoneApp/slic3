import React from 'react';
import { Redirect } from 'react-router';
import { Routes } from '../../Navigation/Routes';
interface SignoutProps {}

const Signout = (props: SignoutProps) => {
    return <Redirect to={{ pathname: Routes.Landing }} />;
};

export default Signout;
