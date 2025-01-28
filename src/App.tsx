import React from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { Footer } from "./components/Footer";
import { Loader } from "./components/Loader";
import Modal from "./components/Modal";
import { NavBar } from "./components/Navbar";
import { useTheme } from "./hooks/useTheme";
import { useUserStorage } from "./hooks/useUserStorage";
import "./index.scss";
import { selectLoader } from "./redux/loader";
import { selectUser } from "./redux/user";
import { protectedRoutes, routes } from "./routes";

interface Props {
  redirectPath?: string;
  children?: React.ReactNode;
}
const ProtectedRoute = ({
  redirectPath = "/login",
  children,
}: Props): React.ReactNode => {
  const user = useSelector(selectUser);
  const { pathname } = useLocation();
  if (!user.id)
    return <Navigate to={`${redirectPath}?redirect=${pathname}`} replace />;
  return children ?? <Outlet />;
};

function App() {
  const { show } = useSelector(selectLoader);
  const { theme } = useTheme();

  useUserStorage();

  return (
    <div
      className="main flex flex-col justify-between min-h-screen h-full relative"
      data-theme={theme}
    >
      <NavBar />
      <main className="lg:px-8 flex flex-1 w-full">
        {show && <Loader />}

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
