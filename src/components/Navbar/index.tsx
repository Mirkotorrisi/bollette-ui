import "./index.scss";
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
    <nav className="navbar flex justify-between w-full items-between flex-wrap bg-teal-500">
      <Link className="navbar__logo mx-6 flex items-center" to="/">
        <h1>
          B<i className="fas fa-futbol"></i>LLETTE
          <i className="far fa-sticky-note"></i>
          <i className="fas fa-sticky-note"></i>
        </h1>
      </Link>
      <button
        className="block lg:hidden p-6"
        onClick={() => setShowMenu(!showMenu)}
      >
        <i className="fas fa-bars"></i>
      </button>
      <div className="w-full block lg:w-auto">
        <ul className="text-sm  flex items-between">
          {((width < 720 && showMenu) || width > 720) && (
            <>
              {user.id ? (
                <>
                  <li className="navbar__item">
                    <Link
                      to="/tickets"
                      className="navbar__item__link block p-4 lg:inline-block lg:mt-0 mr-4"
                    >
                      {user?.username} | {user?.account_sum} $
                    </Link>
                  </li>

                  <li className="navbar__item">
                    <button
                      className="navbar__item__link block p-4 lg:inline-block lg:mt-0 mr-4"
                      onClick={handleLogOut}
                    >
                      Log Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="navbar__item">
                    <Link
                      to="/login"
                      className="navbar__item__link block p-4 lg:inline-block lg:mt-0 mr-4"
                    >
                      Log In
                    </Link>
                  </li>
                  <li className="navbar__item">
                    <Link
                      to="/register"
                      className="navbar__item__link block p-4 lg:inline-block lg:mt-0 mr-4"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
              <li className="navbar__item">
                <Link
                  to="/slot"
                  className="navbar__item__link block p-4 lg:inline-block lg:mt-0 mr-4"
                >
                  Slot
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
