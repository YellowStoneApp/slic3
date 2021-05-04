import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isConstructorDeclaration } from "typescript";
import Form from "../../Components/Form";
import FormInput from "../../Components/FormInput";
import { identityCustomerState } from "../../Hooks/currentIdentityCustomer.hook";
import { signUpState } from "../../Hooks/signup.hook";
import { Routes } from "../../Navigation/Routes";
import { identityService } from "../../Utils/Apis/Identity.service";

const ConfirmEmailContainer = () => {
  const [redirect, setRedirect] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [, setIdentityCustomer] = useRecoilState(identityCustomerState);
  const [signUp] = useRecoilState(signUpState);

  const handleSubmit = async () => {
    if (verificationCode) {
      // todo error handling with verification code.
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
          console.error("can't load email or password to login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (redirect) {
    return <Redirect to={{ pathname: Routes.WalletLogin }} />;
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
