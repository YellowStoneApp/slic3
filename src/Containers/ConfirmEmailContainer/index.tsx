import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Form from "../../Components/Form";
import FormInput from "../../Components/FormInput";
import { Routes } from "../../Navigation/Routes";
import { identityService } from "../../Utils/Apis/Identity.service";

const ConfirmEmailContainer = () => {
  const [userName, setUserName] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleSubmit = async () => {
    if (verificationCode) {
      // todo error handling with verification code.
      identityService
        .confirmSignup(userName, verificationCode)
        .then((response) => {
          console.log(response);
          setRedirect(true);
        });
    }
  };

  useEffect(() => {
    let username = window.location.search.split("=")[1];
    // something to validate that this is a valid email
    // todo validate this is an email. Log error if not
    console.log(username);
    setUserName(username);
  }, []);

  if (redirect) {
    return <Redirect to={{ pathname: Routes.WalletLogin }} />;
  }

  // todo resend verification code.
  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        title="Reset Password"
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
