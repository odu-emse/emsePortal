import React, { useEffect, useState } from "react"
import { Route, Redirect } from "react-router-dom"
import { getToken } from "./helpers"
import axios from "axios"

const Protector = ({ component: Component, ...rest }) => {
	const [authentication, setAuth] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const jwt = getToken()
		if (!jwt) {
			setAuth(false)
			setLoading(false)
			return false
		} else {
			axios
				.get(`${process.env.REACT_APP_API}/api/users/verify`, {
					headers: {
						Authorization: getToken(),
						"Content-Type": "application/json",
					},
				})
				.then((response) => {
					if (response.status === 200) {
						setAuth(true)
						setLoading(false)
						return true
					} else if (
						response.status === 401 ||
						response.status === 400
					) {
						console.error(response)
						setLoading(false)
						setAuth(false)
						return false
					} else {
						setAuth(false)
						setLoading(false)
						return false
					}
				})
				.catch((error) => {
					console.error(error)
					setAuth(false)
					setLoading(false)
					return false
				})
		}
	}, [authentication, loading])

	return loading === true ? (
		<>Loading...</>
	) : (
		<Route
			{...rest}
			render={(props) =>
				authentication === false ? (
					<Redirect
						to={{
							pathname: "/users/login",
							state: {
								from: props.location,
								error: "Not authorized to access...",
							},
						}}
					/>
				) : (
					//if they are authenticated -> send protected component
					<Component {...props} />
				)
			}
		/>
	)
}

export default Protector
