import React, { FunctionComponent } from "react";
import { Routes } from "../Navigation/Routes";
import FormInput from "./FormInput";

interface FormProps {
  title: string;
  subtitle: string;
  onSubmit: () => void;
  submitButtonTitle: string;
  leftRedirect?: Redirection;
  rightRedirect?: Redirection;
}

interface Redirection {
  name: string;
  destination: Routes;
}

const Form: FunctionComponent<FormProps> = ({
  onSubmit,
  title,
  subtitle,
  submitButtonTitle,
  leftRedirect,
  rightRedirect,
  children,
}) => {
  const RedirectLink = (isLeft: boolean, redirectionVals?: Redirection) => {
    if (!redirectionVals) {
      return <></>;
    }
    const textPos = isLeft ? "text-start" : "text-end";
    const className = `w-50 font-11 pb-2 color-theme opacity-60 pb-3 ${textPos}`;
    return (
      <div className={className}>
        <a href={redirectionVals.destination} className="color-theme">
          {redirectionVals.name}
        </a>
      </div>
    );
  };

  return (
    <>
      <div className="page-content header-clear-medium">
        <div className="card card-style">
          <div className="content mt-4 mb-0">
            <h1 className="text-center font-900 font-40 text-uppercase mb-0">
              {title}
            </h1>
            <p className="bottom-0 text-center color-highlight font-11">
              {subtitle}
            </p>

            {children}

            <a
              type="submit"
              onClick={onSubmit}
              className="btn btn-m mt-2 mb-4 btn-full bg-green-dark text-uppercase font-900"
            >
              {submitButtonTitle}
            </a>

            <div className="divider mt-4 mb-3"></div>

            <div className="d-flex">
              {RedirectLink(true, leftRedirect)}
              {RedirectLink(false, rightRedirect)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
