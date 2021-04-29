import { Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import { TextField } from "material-ui";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Routes } from "../../Navigation/Routes";
import { identityService } from "../../Utils/Apis/Identity.service";

interface IConfirmEmailValues {
  verificationCode?: string;
}

const ConfirmEmailContainer = () => {
  const [userName, setUserName] = useState("");
  const [redirect, setRedirect] = useState(false);

  const confirmEmailFormValues: IConfirmEmailValues = {};

  const handleSubmit = async (values: IConfirmEmailValues) => {
    if (values.verificationCode) {
      // todo error handling with verification code.
      identityService
        .confirmSignup(userName, values.verificationCode)
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
      <Formik initialValues={confirmEmailFormValues} onSubmit={handleSubmit}>
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <div>
              <TextField
                name="verificationCode"
                value={values.verificationCode}
                placeholder="VERIFICATION CODE"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <Button type="submit">VERIFY</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ConfirmEmailContainer;
