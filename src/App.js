//Helpers
import React from "react"
import "./App.sass"
import AppNavbar from "./components/AppNavbar"
import Protector from "./components/Protector"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import { ThemeProvider } from "@material-ui/core"
import { theme } from "./components/theme"
//Modules
import Modules from "./components/modules"
import ModuleHousing from "./components/modules/ModuleHousing"
//Users
import Profile from "./components/users/Profile"
import Login from "./components/users/Login"
import Logout from "./components/users/Logout"
import Register from "./components/users/Register"
import UserVerify from "./components/users/UserVerify"
//LMS
import Dashboard from "./components/Dashboard"
import Portal from "./components/Portal"
import Assignments from "./components/Assignments"

function App() {
	return (
		<Router>
			<div className="App">
				<AppNavbar />
				<Switch>
					<Route exact path="/" component={Portal} />

					<Route path="/dashboard" exact component={Dashboard} />

					<Route path="/modules" exact component={Modules} />

					<Protector
						path="/modules/:moduleId"
						component={ModuleHousing}
					/>

					<Protector path="/assignments" component={Assignments} />

					<Route path="/users/login" exact component={Login} />

					<Route path="/users/register" exact component={Register} />

					<Route path="/users/logout" exact component={Logout} />

					<Route path="/users/userVerify" component={UserVerify} />

					<Route path="/users/:id" component={Profile} />
				</Switch>
			</div>
		</Router>
	)
}

export default App
