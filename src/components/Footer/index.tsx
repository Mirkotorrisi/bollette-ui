import { Link } from "react-router-dom";
import "./index.scss";

export const Footer = () => (
  <footer className="footer flex flex-col items-center py-4" id="footer">
    <h1 className="warning text-center">
      THIS IS NOT A REAL BETTING SITE, I WILL NOT PAY ANY WON TICKET
    </h1>
    <ul className="footer_list flex flex-col lg:flex-row justify-between my-4">
      <li className="foot_item text-center">
        <Link to="/aboutme" className="foot_item_link">
          About Me
        </Link>
      </li>
      <li className="foot_item text-center">
        <Link to="/credits" className="foot_item_link">
          Credits
        </Link>
      </li>
      <li className="foot_item text-center">
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
