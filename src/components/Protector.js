import React, { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getToken, loader } from './helpers'
import PropTypes from 'prop-types'

/**
 * @component
 * @name Protector
 * @category Authentication
 * @description A wrapper component that handles the verification of users using built in authentication methods.
 * @returns {React.ReactNode} The child element that is passed in via props, wrapped in the HOC.
 */
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
			setAuth(true)
			setLoading(false)
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

Protector.propTypes = {
	/**
	 * The child component coming from the React Router switch statement that we are authenticating and passing down the tree.
	 */
	component: PropTypes.node.isRequired,
}

export default Protector
