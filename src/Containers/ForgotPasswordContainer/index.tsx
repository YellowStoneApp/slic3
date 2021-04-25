import { Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import { TextField } from "material-ui";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Routes } from "../../Navigation/Routes";
import { identityService } from "../../Utils/Apis/Identity.service";

interface IForgotPasswordValues {
  email?: string;
}

const ForgotPasswordContainer = () => {
  const forgotPasswordValues: IForgotPasswordValues = {};
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (values: IForgotPasswordValues) => {
    if (values.email) {
      setEmail(values.email);
      const response = await identityService
        .forgotPassword(values.email)
        .then((data) => {
          setRedirect(true);
        })
        .catch((error) => {
          // todo alert user of error
        });
    }
  };

  // todo field validation on form
  return (
    <div>
      <Formik initialValues={forgotPasswordValues} onSubmit={handleSubmit}>
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <div>
              <TextField
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <Button type="submit">CONFIRM EMAIL</Button>
          </Form>
        )}
      </Formik>
      {redirect && (
        <Redirect
          to={{ pathname: Routes.ResetPassword, search: `?email=${email}` }}
        />
      )}
    </div>
  );
};

export default ForgotPasswordContainer;
