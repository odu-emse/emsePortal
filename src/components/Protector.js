import PropTypes from 'prop-types'
import { checkForToken, getToken, loader } from './helpers'
import React, { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'

/**
 * @component
 * @name Protector
 * @category Authentication
 * @description A wrapper component that handles the verification of users using built in authentication methods.
 * @returns {JSX.Element} The child element that is passed in via props, wrapped in the HOC.
 */
const Protector = ({ component: Component, ...rest }) => {
	const [authentication, setAuth] = useState(false)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	async function redirect() {
		try {
			const res = await checkForToken()

			res ? setAuth(true) : setAuth(false)

			setLoading(false)
		} catch (error) {
			setError(error)
		}
	}

	useEffect(() => {
		redirect()
	}, [authentication])

	return loading ? (
		loader()
	) : (
		<Route
			{...rest}
			render={(props) =>
				!authentication ? (
					//TODO: Pass error state through the router
					// props.history.push('/users/login')
					<Redirect
						to={{
							from: props.location,
							pathname: '/users/login',
							state: {
								from: props.location,
								error:
									'You are not authorized to access this resource. Please log in or contact your administrator.' ||
									error,
							},
						}}
					/>
				) : (
					//if they are authenticated -> send protected component
					<Component {...props} authentication={authentication} />
				)
			}
		/>
	)
}

Protector.propTypes = {
	/**
	 * The child component coming from the React Router switch statement that we are authenticating and passing down the tree.
	 */
	component: PropTypes.elementType.isRequired,
}

export default Protector
