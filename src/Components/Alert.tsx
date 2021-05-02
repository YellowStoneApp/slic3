import React from "react";

interface AlertProps {
  message?: string;
  setMessage: (message: string | undefined) => void;
}

const Alert = (props: AlertProps) => {
  const { message, setMessage } = props;
  if (message) {
    return (
      <div
        className="ms-3 me-3 mb-5 alert alert-small rounded-s shadow-xl bg-red-dark"
        role="alert"
      >
        <strong>{props.message}</strong>
        <button
          type="button"
          className="close color-white opacity-60 font-16"
          aria-label="Close"
          onClick={() => setMessage(undefined)}
        >
          &times;
        </button>
      </div>
    );
  }
  return <></>;
};

export default Alert;
