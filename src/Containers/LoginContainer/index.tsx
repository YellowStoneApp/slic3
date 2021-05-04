import React, { useState } from "react";
import { Redirect } from "react-router";
import { Routes } from "../../Navigation/Routes";
import { identityService } from "../../Utils/Apis/Identity.service";
import Form from "../../Components/Form";
import FormInput from "../../Components/FormInput";
import { identityCustomerState } from "../../Hooks/currentIdentityCustomer.hook";
import { useRecoilState } from "recoil";
import { tamarakService } from "../../Utils/Apis/tamarak.service";

const LoginContainer = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  //const identityCustomer = useIdentityCustomer();
  const [identityCustomer, setIdentityCustomer] = useRecoilState(
    identityCustomerState
  );

  const login = async () => {
    console.log("clicked");
    console.log(email, password);
    if (email && password) {
      try {
        const response = await identityService.login(email, password);
        setIdentityCustomer({ loggedIn: true });
        const user = await tamarakService.getCurrentCustomer();
        setIdentityCustomer({ loggedIn: true, user: user });
        console.log("user logged in", response);
        setLoggedIn(true);
      } catch (error) {
        // todo alert user of error
      }
    }
  };

  if (loggedIn) {
    console.log("redirecting");
    //history.push(Routes.Gallery);
    // this isn't bullet proof. Something's going on where this fails to redirect us to the gallery page.
    // this could be due to race condition in setting the local storage.
    return <Redirect to={{ pathname: Routes.Gallery }} />;
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
