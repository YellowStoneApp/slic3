import React, { useState } from "react";
import { Redirect } from "react-router";
import { Routes } from "../../Navigation/Routes";
import { identityService } from "../../Utils/Apis/Identity.service";
import Form from "../../Components/Form";
import FormInput from "../../Components/FormInput";
import {
  authCustomerState,
  iAuthCustomer,
} from "../../Hooks/currentIdentityCustomer.hook";
import { useRecoilState } from "recoil";
import { tamarakService } from "../../Utils/Apis/tamarak.service";
import { errorState } from "../../Hooks/error.hook";

const LoginContainer = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  //const identityCustomer = useIdentityCustomer();
  const [authCustomer, setAuthCustomer] =
    useRecoilState<iAuthCustomer>(authCustomerState);
  const [, setError] = useRecoilState(errorState);

  const login = async () => {
    console.log("clicked");
    console.log(email, password);
    if (email && password) {
      try {
        const response = await identityService.login(email, password);
        setAuthCustomer({ customer: response });
        console.log("user logged in", response);
        setLoggedIn(true);
      } catch (error) {
        setError({ message: error.message });
      }
    } else {
      setError({ message: "You must enter your email and password" });
    }
  };

  if (loggedIn) {
    console.log("redirecting");
    return (
      <Redirect
        to={{
          pathname: Routes.Gallery,
          search: `?id=${authCustomer.customer?.identityKey}`,
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
