import React, { useState } from "react"
import {
	FormControl,
	FormGroup,
	TextField,
	Button,
	Container,
	Typography,
} from "@material-ui/core"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import { getToken, refreshPage } from "../helpers"
import { Loader } from "react-feather"

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
		return (
			<Container className="mx-auto w-100 d-flex justify-content-center align-items-center">
				<Loader className="spin" size="42pt" />
			</Container>
		)
	} else {
		if (getToken() !== `Bearer ${null}`) {
			props.history.push("/portal")
			return null
		} else {
			return (
				<Container maxWidth="sm">
					<Typography variant="h3">Login</Typography>
					<ToastContainer />
					<FormControl className="w-100">
						<ToastContainer />
						<FormGroup>
							<TextField
								type="email"
								name="email"
								placeholder="ODU email"
								value={email}
								onChange={(e) => change(e)}
								label="Email"
							/>
						</FormGroup>
						<FormGroup>
							<TextField
								type="password"
								name="password"
								placeholder="Password"
								value={password}
								onChange={(e) => change(e)}
								label="Password"
							/>
						</FormGroup>
						<Button
							onClick={(e) => onLogin(e)}
							className="my-2"
							type="submit"
							color="primary"
							variant="contained"
						>
							Submit
						</Button>
					</FormControl>
				</Container>
			)
		}
	}
}

export default Login
