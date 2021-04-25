import * as React from "react";
import { Redirect } from "react-router-dom";

/** App theme */
import { Formik, Form } from "formik";
import { useState } from "react";
import { TextField } from "material-ui";
import { Button } from "@material-ui/core";
import { Routes } from "../../Navigation/Routes";
import { useHistory } from "react-router-dom";
import { identityService } from "../../Utils/Apis/Identity.service";
import { logService } from "../../Utils/Apis/logging.service";

interface ISignUpValues {
  email: string;
  password?: string;
  confirmedPassword?: string;
}

const SignUpContainer = () => {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const history = useHistory();

  const handleSubmit = async (values: ISignUpValues) => {
    if (values.email && values.password) {
      setEmail(values.email);
      const response = await identityService
        .signUp(values.email, values.password)
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

  const initialValues: ISignUpValues = {
    email: "",
  };

  return (
    <div>
      {redirect && (
        <Redirect
          to={{ pathname: Routes.VerifyEmail, search: `?email=${email}` }}
        />
      )}

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <div>
              <TextField
                name="email"
                value={values.email}
                placeholder="EMAIL"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <TextField
                name="password"
                value={values.password}
                placeholder="PASSWORD"
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                name="confirmedPassword"
                value={values.confirmedPassword}
                placeholder="CONFIRM PASSWORD"
                onChange={handleChange}
              />
            </div>
            <Button type="submit">SIGN UP</Button>
          </Form>
        )}
      </Formik>

      <div>
        <h3>Already have an account?</h3>
        <Button
          onClick={() => {
            history.push(Routes.Login);
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default SignUpContainer;
