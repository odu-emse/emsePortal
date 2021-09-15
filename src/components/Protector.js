import React, { useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getToken, loader } from './helpers'
import axios from 'axios'

const Protector = ({ component: Component, ...rest }) => {
	const [authentication, setAuth] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const jsonwebtoken = getToken()
		if (!jsonwebtoken) {
			setAuth(false)
			setLoading(false)
			return false
		} else {
			const token = localStorage.getItem('JWT')

			if (!token) {
				setAuth(false)
				setLoading(false)
			} else {
				setAuth(true)
				setLoading(false)
			}

			// axios
			// 	.get(`${process.env.REACT_APP_API}/graphql`, {
			// 		headers: {
			// 			Authorization: getToken(),
			// 			"Content-Type": "application/json",
			// 		},
			// 	})
			// 	.then((response) => {
			// 		if (response.status === 200) {
			// 			setAuth(true)
			// 			setLoading(false)
			// 			return true
			// 		} else if (
			// 			response.status === 401 ||
			// 			response.status === 400
			// 		) {
			// 			setLoading(false)
			// 			setAuth(false)
			// 			return false
			// 		} else {
			// 			setAuth(false)
			// 			setLoading(false)
			// 			return false
			// 		}
			// 	})
			// 	.catch((err) => {
			// 		console.error(err)
			// 		setAuth(false)
			// 		setLoading(false)
			// 		return false
			// 	})
		}
	}, [authentication, loading])

	return loading === true ? (
		loader()
	) : (
		<Route
			{...rest}
			render={(props) =>
				authentication === false ? (
					<Redirect
						to={{
							pathname: '/users/login',
							state: {
								from: props.location,
								error: 'Not authorized to access...',
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
