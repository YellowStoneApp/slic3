import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Routes } from "../../Navigation/Routes";
import { tamarakService } from "../../Utils/Apis/tamarak.service";
import {
  identityService,
  iRegisteredCustomer,
} from "../../Utils/Apis/Identity.service";

const SignInResponse = () => {
  const [customer, setCustomer] =
    useState<iRegisteredCustomer | undefined>(undefined);

  const getCurrentCustomer = async () => {
    try {
      const cust = await identityService.getCurrentCustomer();
      const registered = await tamarakService.registerCustomer(cust);
      console.log(registered);
      setCustomer(registered);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentCustomer();
  }, []);

  if (customer === undefined) {
    return <></>;
  }
  return (
    <Redirect
      to={{ pathname: Routes.Gallery, search: `?id=${customer.identityKey}` }}
    />
  );
};

export default SignInResponse;
