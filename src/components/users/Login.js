import React, { useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import { getToken, refreshPage, loader } from "../helpers"
import { Link } from "react-router-dom"

const Login = (props) => {
	const initialUserState = {
		email: "",
		password: "",
		loading: false,
	}

	const [email, setEmail] = useState(initialUserState.email)
	const [password, setPassword] = useState(initialUserState.password)
	const [loading, setLoading] = useState(initialUserState.loading)

	const change = (e) => {
		if (e.target.name === "email") {
			setEmail(e.target.value)
		}
		if (e.target.name === "password") {
			setPassword(e.target.value)
		}
	}

	const onLogin = (e) => {
		e.preventDefault()

		setLoading(true)

		let data = JSON.stringify({
			email,
			password,
		})

		axios
			.post(`${process.env.REACT_APP_API}/api/users/login`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				setLoading(false)
				localStorage.setItem("JWT", res.data.token)
				refreshPage()
				return props.history.push("/dashboard")
			})
			.catch((err) => {
				toast.error(err.response.data.error, {
					position: toast.POSITION.TOP_RIGHT,
				})
				console.error("onLogin() error: ", err)
				setLoading(false)
			})
	}

	if (loading) {
		return loader()
	} else {
		if (getToken() !== `Bearer ${null}`) {
			props.history.push("/portal")
			return null
		} else {
			return (
				<div className="lg:w-1/2 md:w-2/3 sm:mx-4 md:mx-auto mt-4 bg-gray-100 py-5 px-3 rounded shadow border border-gray">
					<h1 className="text-3xl">Login</h1>
					<ToastContainer />
					<form className="w-full my-1">
						<div className="my-3 w-full">
							<label
								htmlFor="email"
								className="text-gray-400 font-xs"
							>
								ODU affiliated email
							</label>
							<input
								type="email"
								className="py-2 px-3 w-full border border-gray rounded "
								placeholder="example@odu.edu"
								name="email"
								onChange={(e) => change(e)}
							/>
						</div>
						<div className="my-3 w-full">
							<label
								htmlFor="password"
								className="text-gray-400 font-xs"
							>
								Password
							</label>
							<input
								type="password"
								className="py-2 px-3 w-full border border-gray rounded"
								placeholder="Password"
								name="password"
								onChange={(e) => change(e)}
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
								or{" "}
								<Link to="/users/forgot" className="">
									<span className="hover:underline hover:text-gray-800 text-blue-800">
										Reset your password
									</span>
								</Link>
							</div>
							<div className="mt-4 block font-sm text-gray-800 font-weight-light">
								Don't have an account?{" "}
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
	}
}

export default Login
