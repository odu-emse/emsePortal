import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { loader } from '../helpers'

/**
 * @name UserVerify
 * @component
 * @description This component is used to verify a user's email address. The link to this component/page is sent to the user's email address upon registration. The user is then authenticated and redirected to the dashboard if the verification is successful.
 * @param {React.FC<Props>} props - Simple props object that we use to redirect the user if they are not successfully authenticated. The members of this object come from `react-router-dom`'s `<Route>` component.
 * @returns {React.ReactHTMLElement | React.ReactFragment} - The UserVerify page and redirection or an error page if the user is not successfully authenticated.
 * @deprecated
 */
const UserVerify = (props) => {
	const token = props.match.params.id

	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	useEffect(() => {
		let config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		try {
			axios
				.get(
					`${process.env.REACT_APP_API}/api/users/userVerify${token}`,
					config
				)
				.then((user) => {
					setLoading(false)
					setUser(user)
				})
				.catch((err) => {
					toast.error(err.response.data.error, {
						position: toast.POSITION.TOP_RIGHT,
					})
					setError(true)
					setErrorMessage(err.response.data.error)
				})
		} catch (error) {
			toast.error(error.response.data.error, {
				position: toast.POSITION.TOP_RIGHT,
			})
			setError(true)
			setErrorMessage(error.response.data.error)
		}
	}, [])

	if (loading) {
		if (error) {
			return (
				<>
					<ToastContainer />
					<div className="container">
						<p>{errorMessage}</p>
					</div>
				</>
			)
		} else {
			return loader()
		}
	} else {
		const { updateDoc } = user.data
		return (
			<div className="container">
				<h1>
					Thank you for verifying your account,{' '}
					{`${updateDoc.firstName} ${updateDoc.lastName}`}!
				</h1>
			</div>
		)
	}
}

UserVerify.propTypes = {
	props: {
		match: PropTypes.object,
		location: PropTypes.object,
		history: PropTypes.object,
	},
}

export default UserVerify
