import { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { LogInComponent } from "./screens/LogInComponent";
import { RegisterComponent } from "./screens/RegisterComponent";
import { BetComponent } from "./screens/BetComponent";
import { TicketsComponent } from "./screens/TicketsComponent";
import { CreditsComponent } from "./screens/CreditsComponent";
import { AboutMeComponent } from "./screens/AboutMeComponent";
import { NotFoundComponent } from "./screens/NotFoundComponent";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";

function App() {
  const [darkTheme, setDarkTheme] = useState(false);

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
        <button
          className="switch-theme"
          title={`turn ${darkTheme ? "on" : "off"} lights!`}
          onClick={() => handleButtonClick()}
        >
          <i class={`fas fa-${darkTheme ? "moon" : "sun"}`}></i>
        </button>
        <Switch>
          <Route path="/" exact component={BetComponent} />
          <Route path="/login" component={LogInComponent} />
          <Route path="/register" component={RegisterComponent} />
          <Route path="/tickets" component={TicketsComponent} />
          <Route path="/credits" component={CreditsComponent} />
          <Route path="/aboutme" component={AboutMeComponent} />
          <Route path="/not-found" component={NotFoundComponent} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
