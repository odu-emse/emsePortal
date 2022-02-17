//Helpers
import { createContext } from 'react'
import './App.sass'
import Protector from './components/Protector'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
//Modules
import Programs from './components/programs'
import ModuleHousing from './components/programs/modules/ModuleHousing'
//Users
import Profile from './components/users/Profile'
import Login from './components/users/Login'
import Logout from './components/users/Logout'
import Register from './components/users/Register'
import UserVerify from './components/users/UserVerify'
//LMS
import Dashboard from './components/Dashboard'
import Portal from './components/Portal'
import Assignments from './components/Assignments'
import Layout from './components/Layout'
import Sidebar from './components/Sidebar'
import NotFound from './components/404'

export const AuthContext = createContext()

function App() {
	return (
		<Router>
			<div className="App">
				<AuthContext.Provider value={{}}>
					<Layout>
						<Sidebar />

						<Switch>
							<Redirect exact from="/" to="/portal" />
							<Protector
								exact
								path="/portal"
								component={Portal}
							/>
							<Protector
								path="/dashboard"
								exact
								component={Dashboard}
							/>
							<Protector
								path="/program"
								exact
								component={Programs}
							/>
							<Protector
								path="/program/:moduleId"
								component={ModuleHousing}
							/>
							<Protector
								path="/assignments"
								component={Assignments}
							/>

							<Route
								path="/users/login"
								exact
								component={Login}
							/>

							<Route
								path="/users/register"
								exact
								component={Register}
							/>

							<Route
								path="/users/logout"
								exact
								component={Logout}
							/>

							<Route
								path="/users/userVerify"
								component={UserVerify}
							/>

							<Protector path="/users/:id" component={Profile} />

							<Route component={NotFound} />
						</Switch>
					</Layout>
				</AuthContext.Provider>
			</div>
		</Router>
	)
}

export default App
