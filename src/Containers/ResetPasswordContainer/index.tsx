import React, { useEffect, useState } from "react";
import Form from "../../Components/Form";
import FormInput from "../../Components/FormInput";
import { identityService } from "../../Utils/Apis/Identity.service";

const ResetPasswordContainer = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let userName = window.location.search.split("=")[1];
    console.log(userName);
    setEmail(userName.trim());
  }, []);

  /**
   * Open question should this log you in automatically after you reset your password?
   */
  const handleSubmit = async () => {
    console.log("submitting");
    if (verificationCode && newPassword) {
      const response = await identityService
        .resetPassword(email, verificationCode, newPassword)
        .then((data) => {
          return data;
        })
        .catch((error) => {
          // todo alert user of error
        });

      console.log(response);
    }
  };

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        title="Reset Password"
        subtitle="Check your email for the verification code and enter below"
        submitButtonTitle="Submit"
      >
        <FormInput
          onValueChange={setVerificationCode}
          name="verificationCode"
          type="name"
          placeholder="Verification Code"
        />
        <FormInput
          onValueChange={setNewPassword}
          name="password"
          type="password"
          placeholder="New Password"
        />
      </Form>
    </div>
  );
};

export default ResetPasswordContainer;
