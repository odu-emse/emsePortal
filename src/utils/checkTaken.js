import axios from 'axios'

export const checkTaken = async (entered_email, data) => {
	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API}/graphql`,
			data
		)

		const { users } = res.data.data

		let response = {
			error: null,
			message: '',
			email: '',
		}

		users.forEach((user) => {
			if (user.email === entered_email) {
				response.error = true
				response.message =
					'Account with this email already exists. Please log in'
				response.email = entered_email
			} else {
				response.error = false
				response.email = entered_email
			}
		})

		return response
	} catch (error) {
		return error
	}
}
