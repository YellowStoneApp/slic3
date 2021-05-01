import React from "react";

interface HeaderProps {}

const Header = (props: HeaderProps) => {
  return (
    <div className="header header-fixed header-logo-center">
      <a href="index.html" className="header-title">
        Gotchu
      </a>
      <a href="#" data-back-button className="header-icon header-icon-1">
        <i className="fas fa-arrow-left"></i>
      </a>
      <a href="#" data-toggle-theme className="header-icon header-icon-4">
        <i className="fas fa-lightbulb"></i>
      </a>
    </div>
  );
};

export default Header;
