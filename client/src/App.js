import React from "react";
import AppNavbar from "./components/AppNavbar";
import Auth from "./components/Authenticator";
import Modules from "./components/modules";
import ModuleHousing from "./components/modules/ModuleHousing";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Dashboard from "./components/Dashboard";
import "./App.sass";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <AppNavbar />
        <Switch>
          <Auth>
            <Route path="/dashboard" exact component={Dashboard} />
          </Auth>

          <Route exact path="/" exact component={Modules} />

          <Route path="/modules/:moduleId" component={ModuleHousing} />

          <Route path="/users/login" exact component={Login} />

          <Route path="/users/register" exact component={Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
