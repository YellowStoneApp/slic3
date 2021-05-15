import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { isConstructorDeclaration } from "typescript";
import Form from "../../Components/Form";
import FormInput from "../../Components/FormInput";
import { identityCustomerState } from "../../Hooks/currentIdentityCustomer.hook";
import { errorState } from "../../Hooks/error.hook";
import { signUpState } from "../../Hooks/signup.hook";
import { Routes } from "../../Navigation/Routes";
import { identityService } from "../../Utils/Apis/Identity.service";
import { logService } from "../../Utils/Apis/logging.service";

const ConfirmEmailContainer = () => {
  const [redirect, setRedirect] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [, setIdentityCustomer] = useRecoilState(identityCustomerState);
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

          setIdentityCustomer({ loggedIn: true });

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
    return <Redirect to={{ pathname: Routes.Gallery }} />;
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
