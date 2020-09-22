import React, { useState, useEffect } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { Container } from "reactstrap"
import { ToastContainer, toast } from "react-toastify"

library.add(fas)

const UserVerify = (props) => {
	const initialUser = {
		user: {},
		loading: true,
		error: false,
		errorMessage: "",
	}

	const token = props.location.search

	const [user, setUser] = useState(initialUser.user)
	const [loading, setLoading] = useState(initialUser.loading)
	const [error, setError] = useState(initialUser.error)
	const [errorMessage, setErrorMessage] = useState(initialUser.errorMessage)

	useEffect(() => {
		let config = {
			headers: {
				"Content-Type": "application/json",
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
			return (
				<Container className="mx-auto w-100 d-flex justify-content-center align-items-center">
					<FontAwesomeIcon icon={["fas", "spinner"]} spin size="3x" />
				</Container>
			)
		}
	} else {
		const { updateDoc } = user.data
		return (
			<div className="container">
				<h1>
					Thank you for verifying your account,{" "}
					{`${updateDoc.firstName} ${updateDoc.lastName}`}!
				</h1>
			</div>
		)
	}
}

export default UserVerify
