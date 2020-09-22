import React, { useState } from "react"
import { Form, FormGroup, Input, Label, Button, Container } from "reactstrap"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { ToastContainer, toast } from "react-toastify"
import { getToken, refreshPage } from "../helpers"

library.add(fas)

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
				setLoading(false)
				console.error("onLogin() error: ", err)
			})
	}

	if (loading) {
		return (
			<Container className="mx-auto w-100 d-flex justify-content-center align-items-center">
				<FontAwesomeIcon icon={["fas", "spinner"]} spin size="3x" />
			</Container>
		)
	} else {
		if (getToken() !== `Bearer ${null}`) {
			props.history.push("/")
			return null
		} else {
			return (
				<Container>
					<h1>Login</h1>
					<ToastContainer />
					<Form onSubmit={(e) => onLogin(e)}>
						<ToastContainer />
						<FormGroup>
							<Label for="Email">Email</Label>
							<Input
								type="email"
								name="email"
								placeholder="email"
								value={email}
								onChange={(e) => change(e)}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="Password">Password</Label>
							<Input
								type="password"
								name="password"
								placeholder="password"
								value={password}
								onChange={(e) => change(e)}
							/>
						</FormGroup>
						<Button type="submit">Submit</Button>
					</Form>
				</Container>
			)
		}
	}
}

export default Login
