import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import Form from "../../Components/Form";
import FormInput from "../../Components/FormInput";
import { errorState } from "../../Hooks/error.hook";
import { Routes } from "../../Navigation/Routes";
import { identityService } from "../../Utils/Apis/Identity.service";

const ForgotPasswordContainer = () => {
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState("");
  const [, setError] = useRecoilState(errorState);

  const handleSubmit = async () => {
    if (email) {
      setEmail(email);
      const response = await identityService
        .forgotPassword(email)
        .then((data) => {
          setRedirect(true);
        })
        .catch((error) => {
          setError({ message: error.message });
        });
    } else {
      setError({ message: "You gotta enter your email." });
    }
  };

  // todo field validation on form
  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        title="Forgot Password"
        subtitle="Enter your email below and we'll send you a verification code."
        submitButtonTitle="Submit"
        leftRedirect={{ name: "Log In", destination: Routes.Login }}
        rightRedirect={{
          name: "Sign Up",
          destination: Routes.Signup,
        }}
      >
        <FormInput
          onValueChange={setEmail}
          name="email"
          type="email"
          placeholder="Email"
        />
      </Form>
      {redirect && (
        <Redirect
          to={{ pathname: Routes.ResetPassword, search: `?email=${email}` }}
        />
      )}
    </div>
  );
};

export default ForgotPasswordContainer;
