import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { checkForToken, getToken, loader, refreshPage } from '../helpers'
import { Link } from 'react-router-dom'

/**
 * @component
 * @name Login
 * @category Authentication
 * @description This component is used to render the login page.
 * @param {React.FC<Props>} props - Simple props object that we use to redirect the user after they are successfully authenticated. The members of this object come from `react-router-dom`'s `<Route>` component.
 * @returns {React.ReactHTMLElement} The rendered HTML element that wraps this component within the page.
 */
const Login = (props) => {
	/**
	 * @member
	 * @name LoginComponentState
	 * @memberof Login
	 * @type {React.ComponentState}
	 * @property {String | null} [email=null] The current state of the email form field.
	 * @property {String | null} [password=null] The current state of the password form field.
	 * @property {Boolean} [loading=false] The current state of the loading indicator based on fetching and requests being sent.
	 * @description This is the states of the component. These properties come from the return of the initialization of the specific `useState`, which returns a tuple of the current state and a function that allows us to update the state. Initial values are set on load.
	 */
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState(null)
	const [loading, setLoading] = useState(false)

	/**
	 *
	 * @param {React.FormEvent} e - The event that is triggered when the user changes the form data.
	 * @function
	 * @memberof Login
	 * @description This function is used to handle all the changes that are done to either the email or password fields in the form.
	 * @todo Simplify this function by switch the state of the email and password fields to a single user state with email and password as a key.
	 */
	const change = (e) => {
		if (e.target.name === 'email') {
			setEmail(e.target.value)
		}
		if (e.target.name === 'password') {
			setPassword(e.target.value)
		}
	}

	/**
	 * @name onLogin
	 * @description This function takes in an html event element to prevent the default browser behavior. It then creates the GraphQL query to login the user, and asks for the token back as a response. If no errors are present in the returned data, the token is saved in local storage and the user is redirected to the home page after a success message. If errors are present, an error message is displayed in a small notification toast.
	 * @function
	 * @memberof Login
	 * @param {React.FormEvent} e - The event that is triggered when the user submits the form.
	 */
	const onLogin = (e) => {
		e.preventDefault()

		setLoading(true)

		let data = {
			query: `query{
				login (input: {email: "${email}", password: "${password}"}){
                    token
				}
			}`,
		}

		if (email.length > 0 && password.length > 0) {
			axios
				.post(`${process.env.REACT_APP_API}/graphql`, data)
				.then((res) => {
					if (res.data.errors) {
						setLoading(false)
						return toast.error(res.data.errors[0].message, {
							position: toast.POSITION.TOP_RIGHT,
						})
					} else {
						const { token } = res.data.data.login
						setLoading(false)
						localStorage.setItem('JWT', token)
						return props.history.push(
							props.location.state !== undefined
								? props.location.state.from.pathname
								: '/dashboard'
						)
					}
				})
				.catch((err) => {
					console.error('onLogin() error: ', err)
					setLoading(false)
				})
		} else {
			setLoading(false)
			return toast.error('Please fill out all fields.', {
				position: toast.POSITION.TOP_RIGHT,
			})
		}
	}

	async function authenticated() {
		try {
			const res = await checkForToken()
			console.log(res)
			setLoading(false)
			return res ? true : false
		} catch (error) {
			setLoading(false)
			toast.error(
				'You are still logged in. Please log out before continuing.',
				{
					position: toast.POSITION.TOP_RIGHT,
				}
			)
			return false
		}
	}

	useEffect(() => {
		authenticated()
		if (props.location.state?.error) {
			toast.error(props.location.state.error, {
				position: toast.POSITION.TOP_RIGHT,
			})
		}
	}, [])

	if (loading) {
		return loader()
	}

	return (
		<div className="lg:w-1/2 md:w-2/3 sm:mx-4 md:mx-auto mt-4 bg-gray-100 py-5 px-3 rounded shadow border border-gray">
			<h1 className="text-3xl">Login</h1>
			<ToastContainer />
			<form className="w-full my-1">
				<div className="my-3 w-full">
					<label htmlFor="email" className="text-gray-400 font-xs">
						ODU affiliated email
					</label>
					<input
						type="email"
						className="py-2 px-3 w-full border border-gray rounded "
						placeholder="example@odu.edu"
						name="email"
						value={email}
						onChange={(e) => change(e)}
						required
					/>
				</div>
				<div className="my-3 w-full">
					<label htmlFor="password" className="text-gray-400 font-xs">
						Password
					</label>
					<input
						type="password"
						className="py-2 px-3 w-full border border-gray rounded"
						placeholder="Password"
						name="password"
						onChange={(e) => change(e)}
						required
					/>
				</div>
				<button
					className="text-gray-100 rounded border-2 border-blue-400 py-2 px-4 bg-blue-400 w-1/2 mx-auto block transition-all hover:bg-transparent hover:text-gray-800"
					type="submit"
					onClick={(e) => onLogin(e)}
				>
					Log in
				</button>
				<div className="w-full text-center">
					<div className="mt-4 block font-sm text-gray-800 font-weight-light">
						<span>{`or `}</span>
						<Link to="/users/forgot" className="">
							<span className="hover:underline hover:text-gray-800 text-blue-800">
								Reset your password
							</span>
						</Link>
					</div>
					<div className="mt-4 block font-sm text-gray-800 font-weight-light">
						<span>{`Don't have an account? `}</span>
						<Link to="/users/register">
							<span className="hover:underline hover:text-gray-800 text-blue-800 font-bold">
								Sign up
							</span>
						</Link>
					</div>
				</div>
			</form>
		</div>
	)
}

export default Login
