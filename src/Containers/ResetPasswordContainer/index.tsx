import { Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import { TextField } from "material-ui";
import React, { useEffect, useState } from "react";
import { identityService } from "../../Utils/Apis/Identity.service";

interface IResetPasswordValues {
  verificationCode?: string;
  newPassword?: string;
}

const ResetPasswordContainer = () => {
  const resetPasswordValues: IResetPasswordValues = {};
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let userName = window.location.search.split("=")[1];
    console.log(userName);
    setEmail(userName.trim());
  }, []);

  const handleSubmit = async (values: IResetPasswordValues) => {
    console.log("submitting");
    if (values.verificationCode && values.newPassword) {
      const response = await identityService
        .resetPassword(email, values.verificationCode, values.newPassword)
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
      <Formik initialValues={resetPasswordValues} onSubmit={handleSubmit}>
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <div>
              <TextField
                name="verificationCode"
                value={values.verificationCode}
                placeholder="VERIFICATION CODE"
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                name="newPassword"
                value={values.newPassword}
                placeholder="PASSWORD"
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            <Button type="submit">SUBMIT</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordContainer;
