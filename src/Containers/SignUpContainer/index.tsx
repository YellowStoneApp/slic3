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
import { useRecoilState } from "recoil";
import { signUpState } from "../../Hooks/signup.hook";
import { errorState } from "../../Hooks/error.hook";
import Auth, { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";

const SignUpContainer = () => {
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setConfirmPassword] = useState("");
  const [, setSignUp] = useRecoilState(signUpState);
  const [, setError] = useRecoilState(errorState);
  const [user, setUser] = useState();

  const handleSubmit = async () => {
    if (email && password) {
      try {
        const responseSignUp = await identityService.signUp(email, password);
        setSignUp({ email, password });
        setRedirect(true);
      } catch (error) {
        setError({ message: error.message });
      }
    } else {
      // todo alert user of this.
      setError({ message: "You gotta give me an email and a password." });
    }
  };

  // when this fires off we get redirected to our login page.
  const handleFacebookSignin = async () => {
    Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Facebook,
    });
  };

  return (
    <div>
      {redirect && <Redirect to={{ pathname: Routes.VerifyEmail }} />}

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
        <a
          href="#"
          className="btn btn-m mt-2 mb-4 btn-full bg-green-dark text-uppercase font-900"
          onClick={handleFacebookSignin}
        >
          FACEBOOK
        </a>
      </Form>
    </div>
  );
};

export default SignUpContainer;
