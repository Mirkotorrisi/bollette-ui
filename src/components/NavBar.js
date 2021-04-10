import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogInComponent } from "../screens/LogInComponent";
import { BetComponent } from "../screens/BetComponent";
import { RegisterComponent } from "../screens/RegisterComponent";
import { TicketsComponent } from "../screens/TicketsComponent";
import { CreditsComponent } from "../screens/CreditsComponent";
import { SlotComponent } from "../screens/SlotComponent";
import { RemoveUser } from "../redux/actions";
import { useSelector } from "react-redux";
import useWindowDimensions from "../utils/useWindowDimensions";

export const NavBar = () => {
  const user = useSelector((state) => state.userReducer);
  const [showMenu, setShowMenu ] = useState(false)
  const {width} = useWindowDimensions();
  const handleLogOut = () => {
    RemoveUser();
  };
  return (
    <nav className="navbar" id="navbar">
      <Link className="logo" to="/" render={() => <BetComponent />}>
        <h1>
          B<i className="fas fa-futbol"></i>LLETTE
          <i className="far fa-sticky-note"></i>
          <i className="fas fa-sticky-note"></i>
        </h1>
      </Link>
      <ul className="nav_items_list">
      {width < 720 && <button onClick={()=>setShowMenu(!showMenu)}><i class="fas fa-bars"></i></button>}
        
        {(width < 720 && showMenu || width > 720)  && <>

        {user.id ? (
          <>
            <li className="nav_item">
              <Link
                to="/tickets"
                className="nav_item_link"
                render={() => <TicketsComponent user={user} />}
              >
                {user?.username} | {user?.account_sum} $
              </Link>
            </li>

            <li className="nav_item">
              <Link
                to="/"
                className="nav_item_link"
                onClick={() => {
                  handleLogOut();
                }}
              >
                Log Out
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav_item">
              <Link
                to="/login"
                className="nav_item_link"
                render={() => <LogInComponent />}
              >
                Log In
              </Link>
            </li>
            <li className="nav_item">
              <Link
                to="/register"
                className="nav_item_link"
                render={() => <RegisterComponent />}
              >
                Register
              </Link>
            </li>
          </>
        )}
        <li className="nav_item">
              <Link
                to="/slot"
                className="nav_item_link"
                render={() => <SlotComponent />}
              >
                Slot
              </Link>
        </li>
        <li className="nav_item">
          <Link
            to="/credits"
            className="nav_item_link"
            render={() => <CreditsComponent />}
          >
            Credits
          </Link>
        </li>
        </>}
      </ul>
    </nav>
  );
};
