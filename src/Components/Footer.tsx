import React from "react";
import { Routes } from "../Navigation/Routes";

interface FooterProps {}

const Footer = (props: FooterProps) => {
  return (
    <div id="footer-bar" className="footer-bar-1">
      <a href={Routes.WalletLogin}>
        <i className="fa fa-home"></i>
        <span>Home</span>
      </a>
      <a href="index-components.html">
        <i className="fa fa-star"></i>
        <span>Features</span>
      </a>
      <a href="index-pages.html" className="active-nav">
        <i className="fa fa-heart"></i>
        <span>Pages</span>
      </a>
      <a href="index-search.html">
        <i className="fa fa-search"></i>
        <span>Search</span>
      </a>
      <a href="#" data-menu="menu-settings">
        <i className="fa fa-cog"></i>
        <span>Settings</span>
      </a>
    </div>
  );
};

export default Footer;
