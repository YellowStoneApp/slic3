import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Amplify from "aws-amplify";
import { RecoilRoot } from "recoil";
import { CurrentWalletUserSubscription } from "./Hooks/currentWalletUser.hook";

import awsconfig from "./aws-exports";
import "./config";

Amplify.configure(awsconfig);

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <CurrentWalletUserSubscription />
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("page")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
