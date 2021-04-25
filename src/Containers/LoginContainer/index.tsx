import { Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import { TextField } from "material-ui";
import React, { useState } from "react";
import { Redirect } from "react-router";
import { Routes } from "../../Navigation/Routes";
import { useHistory } from "react-router-dom";
import { identityService } from "../../Utils/Apis/Identity.service";

interface ILoginFormValues {
  email?: string;
  password?: string;
}

const LoginContainer = () => {
  const initialLoginValues: ILoginFormValues = {};
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  const handleSubmit = async (values: ILoginFormValues) => {
    let { email, password } = values;
    if (email && password) {
      try {
        const response = await identityService.login(email, password);
        console.log("user logged in", response);
        setLoggedIn(true);
      } catch (error) {
        // todo alert user of error
      }
    }
    // todo need validation messaging
  };
  if (loggedIn) {
    console.log("redirecting");
    //history.push(Routes.Gallery);
    // this isn't bullet proof. Something's going on where this fails to redirect us to the gallery page.
    // this could be due to race condition in setting the local storage.
    return <Redirect to={{ pathname: Routes.Gallery }} />;
  }
  return (
    <div>
      <Formik initialValues={initialLoginValues} onSubmit={handleSubmit}>
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <div>
              <TextField
                name="email"
                placeholder="EMAIL"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <TextField
                name="password"
                placeholder="PASSWORD"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <Button type="submit">LOGIN</Button>
          </Form>
        )}
      </Formik>

      <div>
        <h3>Forgot Password?</h3>
        <Button
          onClick={() => {
            history.push(Routes.ForgotPassword);
          }}
        >
          FORGOT PASSWORD
        </Button>
      </div>

      <div>
        <h3>Create an account?</h3>
        <Button
          onClick={() => {
            history.push(Routes.Signup);
          }}
        >
          SIGN UP
        </Button>
      </div>
    </div>
  );
};

export default LoginContainer;
