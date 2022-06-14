/**
 * @name checkTaken
 * @function
 * @category helper
 * @summary This function is a helper function that check if the email passed in is present in the DB or not. See the {@link Register.nextStep Register} component for implementation and more details.
 * @param {String} entered_email - The email to be checked for uniqueness.
 * @returns {Object | Error} The result of the check.
 * @example
 * checkTaken('validEmail@gmail.com')
 * //returns {error: false, message: '', email: 'validEmail@gmail.com'}
 *
 * checkTaken('invalidEmail@gmail.com')
 * //returns {error: true, message: 'Account with this email already exists. Please log in', email: 'invalidEmail@gmail.com'}
 */
import axios from 'axios'

export const checkTaken = async (entered_email) => {
	try {
		const res = await axios.post(`${process.env.REACT_APP_API}/graphql`, {
			query: `query{
                    users{
                        email
                    }
			    }`,
		})

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
