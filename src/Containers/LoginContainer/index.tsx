import { Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import { TextField } from "material-ui";
import React, { useState } from "react";
import { Redirect } from "react-router";
import { Routes } from "../../Navigation/Routes";
import { useHistory } from "react-router-dom";
import { identityService } from "../../Utils/Apis/Identity.service";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";

interface ILoginFormValues {
  email?: string;
  password?: string;
}

const LoginContainer = () => {
  const initialLoginValues: ILoginFormValues = {};
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const history = useHistory();

  const login = async () => {
    console.log("clicked");
    console.log(email, password);
  };

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
    <>
      {/* This is the header needs to go into another component */}
      <Header />

      <Footer />
      {/* This is the actual login card */}
      <div className="page-content header-clear-medium">
        <div className="card card-style">
          <div className="content mt-4 mb-0">
            <h1 className="text-center font-900 font-40 text-uppercase mb-0">
              Login
            </h1>
            <p className="bottom-0 text-center color-highlight font-11">
              Let's get you logged in
            </p>

            <div className="input-style no-borders has-icon validate-field mb-4">
              <i className="fa fa-user"></i>
              <input
                type="email"
                className="form-control validate-name"
                id="form1a"
                placeholder="Email"
                onChange={(target) => setEmail(target.currentTarget.value)}
              />
              <label htmlFor="form1a" className="color-blue-dark font-10 mt-1">
                Email
              </label>
              <i className="fa fa-times disabled invalid color-red-dark"></i>
              <i className="fa fa-check disabled valid color-green-dark"></i>
              <em>(required)</em>
            </div>

            <div className="input-style no-borders has-icon validate-field mb-4">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                className="form-control validate-password"
                id="form3a"
                placeholder="Password"
                onChange={(target) => setPassword(target.currentTarget.value)}
              />
              <label htmlFor="form3a" className="color-blue-dark font-10 mt-1">
                Password
              </label>
              <i className="fa fa-times disabled invalid color-red-dark"></i>
              <i className="fa fa-check disabled valid color-green-dark"></i>
              <em>(required)</em>
            </div>

            <a
              type="submit"
              onClick={login}
              className="btn btn-m mt-2 mb-4 btn-full bg-green-dark text-uppercase font-900"
            >
              Login
            </a>
            <div className="divider"></div>

            {/* <a
              href="/dickbutt"
              className="btn btn-icon btn-m btn-full shadow-l bg-facebook text-uppercase font-900 text-start"
            >
              <i className="fab fa-facebook-f text-center"></i>Login with
              Facebook
            </a>
            <a
              href="#"
              className="btn btn-icon btn-m mt-2 btn-full shadow-l bg-twitter text-uppercase font-900 text-start"
            >
              <i className="fab fa-twitter text-center"></i>Login with Twitter
            </a> */}

            <div className="divider mt-4 mb-3"></div>

            <div className="d-flex">
              <div className="w-50 font-11 pb-2 color-theme opacity-60 pb-3 text-start">
                <a href={Routes.Signup} className="color-theme">
                  Create Account
                </a>
              </div>
              <div className="w-50 font-11 pb-2 color-theme opacity-60 pb-3 text-end">
                <a href={Routes.ForgotPassword} className="color-theme">
                  Forgot Credentials
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End of Page Content-->  */}
      {/* <!-- All Menus, Action Sheets, Modals, Notifications, Toasts, Snackbars get Placed outside the <div className="page-content"> --> */}
      <div
        id="menu-settings"
        className="menu menu-box-bottom menu-box-detached"
      >
        <div className="menu-title mt-0 pt-0">
          <h1>Settings</h1>
          <p className="color-highlight">Flexible and Easy to Use</p>
          <a href="#" className="close-menu">
            <i className="fa fa-times"></i>
          </a>
        </div>
        <div className="divider divider-margins mb-n2"></div>
        <div className="content">
          <div className="list-group list-custom-small">
            <a
              href="#"
              data-toggle-theme
              data-trigger-switch="switch-dark-mode"
              className="pb-2 ms-n1"
            >
              <i className="fa font-12 fa-moon rounded-s bg-highlight color-white me-3"></i>
              <span>Dark Mode</span>
              <div className="custom-control scale-switch ios-switch">
                <input
                  data-toggle-theme
                  type="checkbox"
                  className="ios-input"
                  id="switch-dark-mode"
                />
                <label
                  className="custom-control-label"
                  htmlFor="switch-dark-mode"
                ></label>
              </div>
              <i className="fa fa-angle-left"></i>
            </a>
          </div>
          <div className="list-group list-custom-large">
            <a data-menu="menu-highlights" href="#">
              <i className="fa font-14 fa-tint bg-green-dark rounded-s"></i>
              <span>Page Highlight</span>
              <strong>16 Colors Highlights Included</strong>
              <span className="badge bg-highlight color-white">HOT</span>
              <i className="fa fa-angle-left"></i>
            </a>
            <a data-menu="menu-backgrounds" href="#" className="border-0">
              <i className="fa font-14 fa-cog bg-blue-dark rounded-s"></i>
              <span>Background Color</span>
              <strong>10 Page Gradients Included</strong>
              <span className="badge bg-highlight color-white">NEW</span>
              <i className="fa fa-angle-left"></i>
            </a>
          </div>
        </div>
      </div>
      {/* <!-- Menu Settings Highlights--> */}
      <div
        id="menu-highlights"
        className="menu menu-box-bottom menu-box-detached"
      >
        <div className="menu-title">
          <h1>Highlights</h1>
          <p className="color-highlight">
            Any Element can have a Highlight Color
          </p>
          <a href="#" className="close-menu">
            <i className="fa fa-times"></i>
          </a>
        </div>
        <div className="divider divider-margins mb-n2"></div>
        <div className="content">
          <div className="highlight-changer">
            <a href="#" data-change-highlight="blue">
              <i className="fa fa-circle color-blue-dark"></i>
              <span className="color-blue-light">Default</span>
            </a>
            <a href="#" data-change-highlight="red">
              <i className="fa fa-circle color-red-dark"></i>
              <span className="color-red-light">Red</span>
            </a>
            <a href="#" data-change-highlight="orange">
              <i className="fa fa-circle color-orange-dark"></i>
              <span className="color-orange-light">Orange</span>
            </a>
            <a href="#" data-change-highlight="pink2">
              <i className="fa fa-circle color-pink2-dark"></i>
              <span className="color-pink-dark">Pink</span>
            </a>
            <a href="#" data-change-highlight="magenta">
              <i className="fa fa-circle color-magenta-dark"></i>
              <span className="color-magenta-light">Purple</span>
            </a>
            <a href="#" data-change-highlight="aqua">
              <i className="fa fa-circle color-aqua-dark"></i>
              <span className="color-aqua-light">Aqua</span>
            </a>
            <a href="#" data-change-highlight="teal">
              <i className="fa fa-circle color-teal-dark"></i>
              <span className="color-teal-light">Teal</span>
            </a>
            <a href="#" data-change-highlight="mint">
              <i className="fa fa-circle color-mint-dark"></i>
              <span className="color-mint-light">Mint</span>
            </a>
            <a href="#" data-change-highlight="green">
              <i className="fa fa-circle color-green-light"></i>
              <span className="color-green-light">Green</span>
            </a>
            <a href="#" data-change-highlight="grass">
              <i className="fa fa-circle color-green-dark"></i>
              <span className="color-green-dark">Grass</span>
            </a>
            <a href="#" data-change-highlight="sunny">
              <i className="fa fa-circle color-yellow-light"></i>
              <span className="color-yellow-light">Sunny</span>
            </a>
            <a href="#" data-change-highlight="yellow">
              <i className="fa fa-circle color-yellow-dark"></i>
              <span className="color-yellow-light">Goldish</span>
            </a>
            <a href="#" data-change-highlight="brown">
              <i className="fa fa-circle color-brown-dark"></i>
              <span className="color-brown-light">Wood</span>
            </a>
            <a href="#" data-change-highlight="night">
              <i className="fa fa-circle color-dark-dark"></i>
              <span className="color-dark-light">Night</span>
            </a>
            <a href="#" data-change-highlight="dark">
              <i className="fa fa-circle color-dark-light"></i>
              <span className="color-dark-light">Dark</span>
            </a>
            <div className="clearfix"></div>
          </div>
          <a
            href="#"
            data-menu="menu-settings"
            className="mb-3 btn btn-full btn-m rounded-sm bg-highlight shadow-xl text-uppercase font-900 mt-4"
          >
            Back to Settings
          </a>
        </div>
      </div>
      {/* <!-- Menu Settings Backgrounds--> */}
      <div
        id="menu-backgrounds"
        className="menu menu-box-bottom menu-box-detached"
      >
        <div className="menu-title">
          <h1>Backgrounds</h1>
          <p className="color-highlight">
            Change Page Color Behind Content Boxes
          </p>
          <a href="#" className="close-menu">
            <i className="fa fa-times"></i>
          </a>
        </div>
        <div className="divider divider-margins mb-n2"></div>
        <div className="content">
          <div className="background-changer">
            <a href="#" data-change-background="default">
              <i className="bg-theme"></i>
              <span className="color-dark-dark">Default</span>
            </a>
            <a href="#" data-change-background="plum">
              <i className="body-plum"></i>
              <span className="color-plum-dark">Plum</span>
            </a>
            <a href="#" data-change-background="magenta">
              <i className="body-magenta"></i>
              <span className="color-dark-dark">Magenta</span>
            </a>
            <a href="#" data-change-background="dark">
              <i className="body-dark"></i>
              <span className="color-dark-dark">Dark</span>
            </a>
            <a href="#" data-change-background="violet">
              <i className="body-violet"></i>
              <span className="color-violet-dark">Violet</span>
            </a>
            <a href="#" data-change-background="red">
              <i className="body-red"></i>
              <span className="color-red-dark">Red</span>
            </a>
            <a href="#" data-change-background="green">
              <i className="body-green"></i>
              <span className="color-green-dark">Green</span>
            </a>
            <a href="#" data-change-background="sky">
              <i className="body-sky"></i>
              <span className="color-sky-dark">Sky</span>
            </a>
            <a href="#" data-change-background="orange">
              <i className="body-orange"></i>
              <span className="color-orange-dark">Orange</span>
            </a>
            <a href="#" data-change-background="yellow">
              <i className="body-yellow"></i>
              <span className="color-yellow-dark">Yellow</span>
            </a>
            <div className="clearfix"></div>
          </div>
          <a
            href="#"
            data-menu="menu-settings"
            className="mb-3 btn btn-full btn-m rounded-sm bg-highlight shadow-xl text-uppercase font-900 mt-4"
          >
            Back to Settings
          </a>
        </div>
      </div>
      {/* <!-- Menu Share --> */}
      <div id="menu-share" className="menu menu-box-bottom menu-box-detached">
        <div className="menu-title mt-n1">
          <h1>Share the Love</h1>
          <p className="color-highlight">
            Just Tap the Social Icon. We'll add the Link
          </p>
          <a href="#" className="close-menu">
            <i className="fa fa-times"></i>
          </a>
        </div>
        <div className="content mb-0">
          <div className="divider mb-0"></div>
          <div className="list-group list-custom-small list-icon-0">
            <a href="auto_generated" className="shareToFacebook external-link">
              <i className="font-18 fab fa-facebook-square color-facebook"></i>
              <span className="font-13">Facebook</span>
              <i className="fa fa-angle-left"></i>
            </a>
            <a href="auto_generated" className="shareToTwitter external-link">
              <i className="font-18 fab fa-twitter-square color-twitter"></i>
              <span className="font-13">Twitter</span>
              <i className="fa fa-angle-left"></i>
            </a>
            <a href="auto_generated" className="shareToLinkedIn external-link">
              <i className="font-18 fab fa-linkedin color-linkedin"></i>
              <span className="font-13">LinkedIn</span>
              <i className="fa fa-angle-left"></i>
            </a>
            <a href="auto_generated" className="shareToWhatsApp external-link">
              <i className="font-18 fab fa-whatsapp-square color-whatsapp"></i>
              <span className="font-13">WhatsApp</span>
              <i className="fa fa-angle-left"></i>
            </a>
            <a
              href="auto_generated"
              className="shareToMail external-link border-0"
            >
              <i className="font-18 fa fa-envelope-square color-mail"></i>
              <span className="font-13">Email</span>
              <i className="fa fa-angle-left"></i>
            </a>
          </div>
        </div>
      </div>
    </>
    // <div>
    //   <Formik initialValues={initialLoginValues} onSubmit={handleSubmit}>
    //     {({ values, handleChange, handleBlur }) => (
    //       <Form>
    //         <div>
    //           <TextField
    //             name="email"
    //             placeholder="EMAIL"
    //             value={values.email}
    //             onChange={handleChange}
    //             onBlur={handleBlur}
    //           />
    //         </div>
    //         <div>
    //           <TextField
    //             name="password"
    //             placeholder="PASSWORD"
    //             value={values.password}
    //             onChange={handleChange}
    //             onBlur={handleBlur}
    //           />
    //         </div>
    //         <Button type="submit">LOGIN</Button>
    //       </Form>
    //     )}
    //   </Formik>

    //   <div>
    //     <h3>Forgot Password?</h3>
    //     <Button
    //       onClick={() => {
    //         history.push(Routes.ForgotPassword);
    //       }}
    //     >
    //       FORGOT PASSWORD
    //     </Button>
    //   </div>

    //   <div>
    //     <h3>Create an account?</h3>
    //     <Button
    //       onClick={() => {
    //         history.push(Routes.Signup);
    //       }}
    //     >
    //       SIGN UP
    //     </Button>
    //   </div>
    // </div>
  );
};

export default LoginContainer;
