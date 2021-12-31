import { useState } from "react";
import { Link } from "react-router-dom";
import { logOut, selectUser } from "../../redux/user";
import { useSelector } from "react-redux";
import useWindowDimensions from "../../utils/useWindowDimensions";
import { useAppDispatch } from "../../store";

export const NavBar = () => {
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { width } = useWindowDimensions();
  const handleLogOut = () => {
    dispatch(logOut());
  };
  return (
    <nav className="navbar" id="navbar">
      <Link className="logo" to="/">
        <h1>
          B<i className="fas fa-futbol"></i>LLETTE
          <i className="far fa-sticky-note"></i>
          <i className="fas fa-sticky-note"></i>
        </h1>
      </Link>
      <ul className="nav_items_list">
        {width < 720 && (
          <button onClick={() => setShowMenu(!showMenu)}>
            <i className="fas fa-bars"></i>
          </button>
        )}

        {((width < 720 && showMenu) || width > 720) && (
          <>
            {user.id ? (
              <>
                <li className="nav_item">
                  <Link to="/tickets" className="nav_item_link">
                    {user?.username} | {user?.account_sum} $
                  </Link>
                </li>

                <li className="nav_item">
                  <button className="nav_item_link" onClick={handleLogOut}>
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav_item">
                  <Link to="/login" className="nav_item_link">
                    Log In
                  </Link>
                </li>
                <li className="nav_item">
                  <Link to="/register" className="nav_item_link">
                    Register
                  </Link>
                </li>
              </>
            )}
            <li className="nav_item">
              <Link to="/slot" className="nav_item_link">
                Slot
              </Link>
            </li>
            <li className="nav_item">
              <Link to="/credits" className="nav_item_link">
                Credits
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
