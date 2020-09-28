import React, { useEffect, useState } from "react"
import { Route, Redirect } from "react-router-dom"
import axios from "axios"
import { getToken } from "./helpers"
import { Container } from "@material-ui/core"
import { Loader } from "react-feather"

const Protector = ({ component: Component, ...rest }) => {
	const initialUserState = {
		user: {},
		loading: true,
		authenticated: false,
		fetchError: null,
	}

	const [user, setUser] = useState(initialUserState)

	useEffect(() => {
		const getUser = async () => {
			const jwt = getToken()
			if (!jwt) {
				return false
			}

			try {
				const { data } = await axios
					.get(`${process.env.REACT_APP_API}/api/users/verify`, {
						headers: {
							Authorization: getToken(),
							"Content-Type": "application/json",
						},
					})
					.catch((err) => {
						console.error(`axios get error catch: ${err}`)
					})

				setUser(data)
			} catch (error) {
				console.error(error)
			}
		}

		getUser()
	}, [])
	return user.loading ? (
		<Container className="mx-auto w-100 d-flex justify-content-center align-items-center">
			<Loader className="spin" size="42pt" />
		</Container>
	) : (
		<Route
			{...rest}
			render={(props) => {
				if (user.authenticated === true) {
					//if they are authenticated -> send protected component
					return <Component {...props}></Component>
				} else if (user.authenticated === false) {
					return (
						<Redirect
							to={{
								pathname: "/users/login",
								state: {
									from: props.location,
									error: "Not authorized to access...",
								},
							}}
						/>
					)
				}
			}}
		></Route>
	)
}

export default Protector
