import React from "react";
import { Link } from "react-router-dom";
import { AboutMeComponent } from "../screens/AboutMeComponent";

import { CreditsComponent } from "../screens/CreditsComponent";

export const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <h1 className="warning">
        THIS IS NOT A REAL BETTING SITE, I WILL NOT PAY ANY WON TICKET
      </h1>
      <ul className="footer_list">
        <li className="foot_item">
          <Link
            to="/aboutme"
            className="foot_item_link"
            render={() => <AboutMeComponent />}
          >
            About Me
          </Link>
        </li>
        <li className="foot_item">
          <Link
            to="/credits"
            className="foot_item_link"
            render={() => <CreditsComponent />}
          >
            Credits
          </Link>
        </li>
        <li className="foot_item">
          <a href="https://github.com/Mirkotorrisi">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.facebook.com/mirko.torrisi92/">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.linkedin.com/in/mirko-torrisi/">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="mailto:mirko.torrisi92@gmail.com">
            <i className="fas fa-envelope-square"></i>
          </a>
        </li>
      </ul>
    </footer>
  );
};
