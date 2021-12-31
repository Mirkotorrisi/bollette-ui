import { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import { NavBar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { routes } from "./routes";
import Modal from "./components/Modal";
import { selectLoader } from "./redux/loader";
import { useSelector } from "react-redux";

function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const { show } = useSelector(selectLoader);
  const handleButtonClick = () => {
    setDarkTheme(!darkTheme);
  };

  useEffect(() => {
    var head = document.head;
    var link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = `./App-${darkTheme ? "dark" : "light"}.css`;

    head.appendChild(link);

    return () => {
      head.removeChild(link);
    };
  }, [darkTheme]);
  return (
    <div>
      <NavBar />
      <div className="App">
        {show && <i className="fas fa-futbol infinite"></i>}
        <button
          className="switch-theme"
          title={`turn ${darkTheme ? "on" : "off"} lights!`}
          onClick={() => handleButtonClick()}
        >
          <i className={`fas fa-${darkTheme ? "moon" : "sun"}`}></i>
        </button>
        <Switch>
          {routes.map(({ path, component, exact }) => (
            <Route path={path} component={component} exact={exact} />
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
