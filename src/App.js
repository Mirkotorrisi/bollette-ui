import "./App-light.css";

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
  return (
    <div>
      <NavBar />
      <div className="App">
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
