/**
 * @name App
 * @class
 * @summary The main application component that renders the entire application.
 */
//Helpers
import { createContext } from 'react'
import Protector from './components/Protector'
import {
	Redirect,
	Route,
	BrowserRouter as Router,
	Switch,
} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
//Modules
import Programs from './components/programs'
import ModuleHousing from './components/programs/modules/ModuleHousing'
//Users
import Profile from './components/users/Profile'
import Login from './components/auth/Login'
import RedirectR from './components/auth/Redirect'
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
//Context
import { InstructorProvider } from './scripts/instructorProfileContext'
import {
	InstructorContext,
	InstructorContextDefaultValue,
} from './components/users/Profile'

export const AuthContext = createContext({})

function App() {
	return (
		<Router>
			<div className="App font-sans">
				<AuthContext.Provider value={{}}>
					<Layout>
						<Sidebar />

						<Switch>
							{/* <Protector
								exact
								path="/"
								component={<Redirect to="/portal" />}
							/> */}
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
							<Protector
								path="/assignments:assignmentId"
								component={Assignments}
							/>

							<Route
								path="/login"
								exact
								component={Login}
							/>

							<Route
								path="/redirect"
								exact
								component={RedirectR}
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
								path="/users/verify/:id"
								component={UserVerify}
							/>

							<InstructorProvider>
								<Protector
									path="/users/:id"
									component={Profile}
								/>
							</InstructorProvider>

							<Route component={NotFound} />
						</Switch>
					</Layout>
				</AuthContext.Provider>
			</div>
		</Router>
	)
}

export default App
