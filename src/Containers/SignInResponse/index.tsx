import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Routes } from "../../Navigation/Routes";
import { tamarakService } from "../../Utils/Apis/tamarak.service";
import { iCustomer, identityService } from "../../Utils/Apis/Identity.service";

const SignInResponse = () => {
  const [customer, setCustomer] = useState<iCustomer | undefined>(undefined);

  const getCurrentCustomer = async () => {
    try {
      const cust = await identityService.getCurrentCustomer();
      console.log(cust);
      await tamarakService.registerCustomer(cust);
      console.log("redirecting to gallery");
      setCustomer(cust);
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
  return <Redirect to={{ pathname: Routes.Gallery }} />;
};

export default SignInResponse;
