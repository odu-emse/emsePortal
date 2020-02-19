import React from "react";
import AppNavbar from "./components/AppNavbar";
import Portal from "./components/Portal";
import Modules from "./components/modules/Modules";
import ModuleHousing from "./components/modules/ModuleHousing";
import Profile from "./components/users/Profile";
import Login from "./components/users/Login";
import Signup from "./components/users/Signup";
import "./App.sass";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <AppNavbar />
        <Switch>
          <Route path="/" exact>
            <Portal />
          </Route>

          <Route exact path="/modules">
            <Modules />
          </Route>

          <Route path="/modules/:moduleId" component={ModuleHousing} />

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/users/login">
            <Login />
          </Route>

          <Route path="/users/signup">
            <Signup />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
