import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import useLocalStorage from "use-local-storage";

import { NavBar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { protectedRoutes, routes } from "./routes";
import Modal from "./components/Modal";
import { selectLoader } from "./redux/loader";
import { useSelector } from "react-redux";
import { Loader } from "./components/Loader";
import { useUserStorage } from "./utils/useUserStorage";
import { selectUser } from "./redux/user";

interface Props {
  redirectPath?: string;
  children?: JSX.Element;
}
const ProtectedRoute = ({
  redirectPath = "/login",
  children,
}: Props): JSX.Element => {
  const user = useSelector(selectUser);
  if (!user.id) return <Navigate to={redirectPath} replace />;
  return children ?? <Outlet />;
};

function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const { show } = useSelector(selectLoader);
  const isLight = theme === "light";
  const handleButtonClick = () => {
    setTheme(isLight ? "dark" : "light");
  };

  useUserStorage();

  return (
    <div
      className="main flex flex-col justify-between min-h-screen h-full relative"
      data-theme={theme}
    >
      <NavBar />
      <main className="lg:px-8 flex flex-1 ">
        {show && <Loader />}
        <button
          className="switch-theme px-1"
          title={`turn ${isLight ? "off" : "on"} lights!`}
          onClick={() => handleButtonClick()}
        >
          <i className={`fas fa-${isLight ? "moon" : "sun"}`}></i>
        </button>
        <Routes>
          {routes.map(({ path, component }, i) => (
            <Route path={path} Component={component} key={i} />
          ))}
          <Route element={<ProtectedRoute />}>
            {protectedRoutes.map(({ component, path }) => (
              <Route path={path} Component={component} key={path} />
            ))}
          </Route>
        </Routes>

        {/* <Navigate to="/not-found" replace={true} /> */}
      </main>
      <Modal />
      <Footer />
    </div>
  );
}

export default App;
