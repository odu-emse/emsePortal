import React from "react";
import AppNavbar from "./components/AppNavbar";
import Portal from "./components/Portal";
import Modules from "./components/modules";
import ModuleHousing from "./components/modules/ModuleHousing";
import Profile from "./components/users/Profile";
import Login from "./components/users/Login";
import "./App.sass";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <AppNavbar />
        <Switch>
          <Route path="/" exact component={Portal} />

          <Route exact path="/modules" component={Modules} />

          <Route path="/modules/:moduleId" component={ModuleHousing} />

          <Route path="/users/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
