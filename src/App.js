//Helpers
import React from "react"
import "./App.sass"
import AppNavbar from "./components/AppNavbar"
import Protector from "./components/Protector"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
//Modules
import Programs from "./components/programs"
import ModuleHousing from "./components/programs/modules/ModuleHousing"
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
					<Protector exact path="/portal" component={Portal} />

					<Protector path="/dashboard" exact component={Dashboard} />

					<Protector path="/programs" exact component={Programs} />

					<Protector
						path="/modules/:moduleId"
						component={ModuleHousing}
					/>

					<Protector path="/assignments" component={Assignments} />

					<Route path="/users/login" exact component={Login} />

					<Route path="/users/register" exact component={Register} />

					<Route path="/users/logout" exact component={Logout} />

					<Route path="/users/userVerify" component={UserVerify} />

					<Protector path="/users/:id" component={Profile} />
				</Switch>
			</div>
		</Router>
	)
}

export default App
