import "./index.scss";
import { Route, Redirect, Switch } from "react-router-dom";
import useLocalStorage from "use-local-storage";

import { NavBar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { routes } from "./routes";
import Modal from "./components/Modal";
import { selectLoader } from "./redux/loader";
import { useSelector } from "react-redux";
import { Loader } from "./components/Loader";
import { useUserStorage } from "./utils/useUserStorage";

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
      className="main flex flex-col justify-between min-h-screen"
      data-theme={theme}
    >
      <NavBar />
      <div className="lg:px-8">
        {show && <Loader />}
        <button
          className="switch-theme px-1"
          title={`turn ${isLight ? "off" : "on"} lights!`}
          onClick={() => handleButtonClick()}
        >
          <i className={`fas fa-${isLight ? "moon" : "sun"}`}></i>
        </button>
        <Switch>
          {routes.map(({ path, component, exact }, i) => (
            <Route path={path} component={component} exact={exact} key={i} />
          ))}
          <Redirect to="/not-found" />
        </Switch>
      </div>
      <Modal />
      <Footer />
    </div>
  );
}

export default App;
