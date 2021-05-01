import * as React from "react";
import { Redirect } from "react-router-dom";

/** App theme */
import { useState } from "react";
import { Routes } from "../../Navigation/Routes";
import { useHistory } from "react-router-dom";
import { identityService } from "../../Utils/Apis/Identity.service";
import { logService } from "../../Utils/Apis/logging.service";
import Form from "../../Components/Form";
import FormInput from "../../Components/FormInput";

const SignUpContainer = () => {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (email && password) {
      const response = await identityService
        .signUp(email, password)
        .then((response) => {
          setRedirect(true);
        })
        .catch((error) => {
          // todo alert user of error
        });
    } else {
      // todo alert user of this.
      logService.error("Must submit a username and password.");
    }
  };

  return (
    <div>
      {redirect && (
        <Redirect
          to={{ pathname: Routes.VerifyEmail, search: `?email=${email}` }}
        />
      )}

      <Form
        onSubmit={handleSubmit}
        title="Sign Up"
        subtitle="Let's get you signed up"
        submitButtonTitle="Sign Up"
        leftRedirect={{ name: "Log In", destination: Routes.Login }}
        rightRedirect={{
          name: "Forgot Password",
          destination: Routes.ForgotPassword,
        }}
      >
        <FormInput
          onValueChange={setEmail}
          name="email"
          type="email"
          placeholder="Email"
        />
        <FormInput
          onValueChange={setPassword}
          name="password"
          type="password"
          placeholder="Password"
        />
        <FormInput
          onValueChange={setConfirmPassword}
          name="confirmpassword"
          type="password"
          placeholder="Confirm Password"
        />
      </Form>
    </div>
  );
};

export default SignUpContainer;
