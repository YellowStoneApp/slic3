import React from "react";
import { useRecoilState } from "recoil";
import { errorState } from "../Hooks/error.hook";

const ErrorPopup = () => {
  const [error, setError] = useRecoilState(errorState);

  const classNameNotUp = "menu menu-box-bottom menu-box-detached";
  const classNameUp = classNameNotUp + " menu-active";

  return (
    <>
      <div
        id="menu-error"
        className={error.message ? classNameUp : classNameNotUp}
      >
        <div className="menu-title">
          <h1>Error</h1>
          <p className="color-highlight">{error.message}</p>
          <a
            href="#"
            onClick={() => setError({ message: undefined })}
            className="close-menu"
          >
            <i className="fa fa-times"></i>
          </a>
        </div>
        <div className="divider divider-margins mb-n2"></div>
        <div className="content"></div>
      </div>
    </>
  );
};

export default ErrorPopup;
