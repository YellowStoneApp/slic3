import React from "react";
import { errorSelector, useRecoilState } from "recoil";
import { errorState } from "../Hooks/error.hook";
import { Routes } from "../Navigation/Routes";
import ErrorPopup from "./ErrorPopup";

interface FooterProps {}

const Footer = (props: FooterProps) => {
  const [error, setError] = useRecoilState(errorState);

  const classNameNotUp = "menu menu-box-bottom menu-box-detached";
  const classNameUp = classNameNotUp + " menu-active";

  return (
    <>
      <div id="footer-bar" className="footer-bar-1">
        <a href={Routes.Gallery}>
          <i className="fa fa-home"></i>
          {/* <span>Home</span> */}
        </a>
        {/* <a href={Routes.Profile} className="active-nav"> */}
        <a href={Routes.Profile}>
          <i className="fa fa-user-alt"></i>
          {/* <span>Features</span> */}
        </a>
        <a href={Routes.Create}>
          <i className="fa fa-plus"></i>
          {/* <span>Pages</span> */}
        </a>
        <a href={Routes.Search}>
          <i className="fa fa-search"></i>
          {/* <span>Search</span> */}
        </a>
        <a href="#" data-menu="menu-settings">
          <i className="fa fa-cog"></i>
          {/* <span>Settings</span> */}
        </a>
      </div>

      <div
        id="menu-settings"
        className="menu menu-box-bottom menu-box-detached"
      >
        <div className="menu-title mt-0 pt-0">
          <h1>Settings</h1>
          <p className="color-highlight">Flexible and Easy to Use</p>
          <a className="close-menu">
            <i className="fa fa-times"></i>
          </a>
        </div>
        <div className="divider divider-margins mb-n2"></div>
        <div className="content">
          <div className="list-group list-custom-small">
            <a
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
  );
};

export default Footer;
