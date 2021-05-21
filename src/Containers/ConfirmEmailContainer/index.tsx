import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { isConstructorDeclaration } from "typescript";
import Form from "../../Components/Form";
import FormInput from "../../Components/FormInput";
import {
  authCustomerState,
  iAuthCustomer,
} from "../../Hooks/currentIdentityCustomer.hook";
import { errorState } from "../../Hooks/error.hook";
import { signUpState } from "../../Hooks/signup.hook";
import { Routes } from "../../Navigation/Routes";
import { identityService } from "../../Utils/Apis/Identity.service";
import { logService } from "../../Utils/Apis/logging.service";
import { tamarakService } from "../../Utils/Apis/tamarak.service";

const ConfirmEmailContainer = () => {
  const [redirect, setRedirect] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [authCustomer, setAuthCustomer] =
    useRecoilState<iAuthCustomer>(authCustomerState);
  const [signUp] = useRecoilState(signUpState);
  const [, setError] = useRecoilState(errorState);

  const handleSubmit = async () => {
    if (verificationCode) {
      const { email, password } = signUp;
      try {
        if (email && password) {
          console.log(email, password);
          const responseConfirm = await identityService.confirmSignup(
            email,
            verificationCode
          );
          const responseLogin = await identityService.login(email, password);

          const response = await tamarakService.registerCustomer({
            ...responseLogin,
            email,
          });

          setAuthCustomer({ customer: responseLogin });

          setRedirect(true);
        } else {
          logService.error(
            "can't load email or password to login from ConfirmEmailContainer. Values are not set in signup state."
          );
          setError({
            message:
              "This is awkward.... Something went wrong. Please try again later.",
          });
        }
      } catch (error) {
        setError({ message: error.message });
      }
    }
  };

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: Routes.Gallery,
          search: `?id=${authCustomer.customer?.identityKey}`,
        }}
      />
    );
  }

  // todo resend verification code.
  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        title="Verification"
        subtitle="Check your email for the verification code and enter below"
        submitButtonTitle="Confirm"
      >
        <FormInput
          onValueChange={setVerificationCode}
          name="verificationCode"
          type="name"
          placeholder="Verification Code"
        />
      </Form>
    </div>
  );
};

export default ConfirmEmailContainer;
