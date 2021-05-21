import React, { useState } from "react";
import { Redirect } from "react-router";
import { Routes } from "../../Navigation/Routes";
import {
  identityService,
  iRegisteredCustomer,
} from "../../Utils/Apis/Identity.service";
import Form from "../../Components/Form";
import FormInput from "../../Components/FormInput";
import { useRecoilState } from "recoil";
import { errorState } from "../../Hooks/error.hook";

const LoginContainer = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  //const identityCustomer = useIdentityCustomer();
  const [authCustomer, setAuthCustomer] =
    useState<iRegisteredCustomer | undefined>(undefined);
  const [, setError] = useRecoilState(errorState);

  const login = async () => {
    if (email && password) {
      try {
        const response = await identityService.login(email, password);
        setAuthCustomer(response);
        setLoggedIn(true);
      } catch (error) {
        setError({ message: error.message });
      }
    } else {
      setError({ message: "You must enter your email and password" });
    }
  };

  if (loggedIn) {
    return (
      <Redirect
        to={{
          pathname: Routes.Gallery,
          search: `?id=${authCustomer?.identityKey}`,
        }}
      />
    );
  }
  return (
    <>
      <Form
        onSubmit={login}
        title="Login"
        subtitle="Let's get you logged in"
        submitButtonTitle="Login"
        leftRedirect={{ name: "Sign Up", destination: Routes.Signup }}
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
      </Form>
    </>
  );
};

export default LoginContainer;
