import jwt from 'jsonwebtoken'
import axios from 'axios'
import { Loader } from 'react-feather'

/**
 * @category helper
 * @function
 * @instance
 * @param { number } x - The number to be rounded
 * @param { number } precision - The decimal position to round to
 * @returns { number } rounded float number
 */
export let round_to_precision = (x, precision) => {
	let y = +x + (precision === undefined ? 0.5 : precision / 2)
	return y - (y % (precision === undefined ? 1 : +precision))
}

/**
 * @desc Helper function to calculate the average score of the feedbacks
 * @category helper
 * @function
 * @deprecated
 * @param { Array } arr - The array that we want the average of
 * @returns { number } Returns either the average of the array elements or 0 if the array is empty
 */
export let rating = (arr) => {
	if (arr.length > 0) {
		let sum = arr.reduce((previous, current) => (current += previous))
		let avg = sum / arr.length
		return avg
	} else {
		return 0
	}
}

/**
 * @desc Helper function to calculate the percentage of the remaining time left in a lesson
 * @category helper
 * @function
 * @deprecated
 * @param { number } dur - The duration of the lesson
 * @param { number } rem - The remaining time left of the lesson
 * @returns { number } Returns the percentage of the remaining time left in a lesson
 */
export let progress = (dur, rem) => {
	let perc = (rem / dur) * 100
	return Math.round(perc)
}

//TODO:further integration of this is needed in later release
/**
 * @desc Helper function for abandoning a module
 * @category helper
 * @function
 * @todo Further integration of this is needed in later release
 * @param { string } id - The id of the module to be abandoned
 */
export let abandonModule = (id) => {
	console.log(id)
}

/**
 * @desc Helper function for getting the JWT token from local storage and adds Bearer in front of it to be used as an Authorization header
 * @function
 * @deprecated
 * @category helper
 * @returns { string } Returns the JWT token in a Bearer format
 */
export const getToken = () => {
	return 'Bearer ' + localStorage.getItem('JWT')
}

/**
 * @desc Helper function to log out the user by removing their local storage JWT
 * @function
 */
export const removeToken = () => {
	return localStorage.removeItem('JWT')
}

/**
 * @desc Helper function to decode the JWT token present in local storage
 * @category helper
 * @function
 * @returns { string | null } Returns the user's ID if the token is valid, null otherwise
 */
export const decoder = () => {
	const token = localStorage.getItem('JWT')
	const decoded = jwt.decode(token)
	if (decoded !== null) {
		return decoded.id
	} else {
		return null
	}
}

/**
 * @desc Helper function to format full unix date into a single string that includes the time in a 12-hour format
 * @example
 * // returns 2020-05-18, 4:00 AM
 * convert(1589788800)
 * @category helper
 * @function
 * @deprecated
 * @param { number } timestamp - The duration of the lesson
 * @returns { string } Returns the percentage of the remaining time left in a lesson
 */
export const convert = (timestamp) => {
	var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
		yyyy = d.getFullYear(),
		mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
		dd = ('0' + d.getDate()).slice(-2), // Add leading 0.
		hh = d.getHours(),
		h = hh,
		min = ('0' + d.getMinutes()).slice(-2), // Add leading 0.
		ampm = 'AM',
		time

	if (hh > 12) {
		h = hh - 12
		ampm = 'PM'
	} else if (hh === 12) {
		h = 12
		ampm = 'PM'
	} else if (hh === 0) {
		h = 12
	}

	// ie: 2013-02-18, 8:35 AM
	time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm

	return time
}

export const refreshPage = () => {
	window.location.reload()
}

/**
 * @desc Helper function to check if a user is authenticated or not. It uses `getToken()` to get the JWT token from local storage and verify it. If the token is not valid, the function returns false. If the token is present and valid, the function sends a GET request to the `/api/users/verify` REST route with the token as an Authorization header. If the API responds with a HTTP code 200, the function returns true. If the response is not successful, the function returns false.
 * @category helper
 * @function
 * @deprecated
 * @returns { Boolean } Returns true if the user is authenticated, false otherwise
 */
export const isAuthenticated = async () => {
	const jwt = getToken()
	if (!jwt) {
		return false
	} else {
		try {
			const resp = await axios.get(
				`${process.env.REACT_APP_API}/api/users/verify`,
				{
					headers: {
						Authorization: getToken(),
						'Content-Type': 'application/json',
					},
				}
			)
			if (resp.status === 200) {
				return true
			} else if (resp.status === 401) {
				console.error(resp)
				return false
			} else {
				return false
			}
		} catch (error) {
			console.error(error)
			return false
		}
	}
}

/**
 * @desc Helper function to display a loading spinner
 * @category helper
 * @function
 * @returns { React.ReactElement } Returns the loader component
 */
export const loader = () => {
	return (
		<div className="mx-auto w-full flex justify-center items-center">
			<Loader className="spin" size="42pt" />
		</div>
	)
}

/**
 * __WIP__ </br>
 * @desc Helper function to check if the user's ID from local storage is the same as the user's ID from the URL params. If not, the user is redirected to their own profile page.
 * @category helper
 * @async
 * @function
 * @param {string} token - The user's JWT token from local storage
 * @param {object} history - React router DOM history object
 * @param {object} params - Object containing the user's ID from the URL params
 * @param {string} params.id - The user's ID from the URL params
 */
export const profileCheck = (token, history, params) => {
	const cypher = jwt.decode(token)
	if (cypher.id !== params.id) {
		history.push(`/users/${cypher.id}`)
		window.location.reload()
	}
}

/**
 * @category helper
 * @function
 * @deprecated
 */
export const getModule = async (id) => {
	try {
		const resp = await axios.get(
			`${process.env.REACT_APP_API}/api/modules/${id.identifier}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
		if (resp.status === 200) {
			return resp
		} else if (resp.status === 401) {
			console.error(resp)
			return null
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

/**
 * @desc Helper function to generate a random number between two numbers (inclusive), given as arguments
 * @category helper
 * @function
 * @example
 * // returns 7
 * gerRandomNum(0, 10)
 * @param { number } min - The minimum number
 * @param { number } max - The maximum number
 * @returns { number } Returns a random integer between the two given numbers
 */
export const getRandomNum = (min, max) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min) + min)
}

/**
 * @desc Helper function to calculate the average of the feedback scores provided by students. The function takes an array of feedback scores and returns the average or null if the array is empty or the average cannot be calculated.
 * @category helper
 * @function
 * @param {Object[]} feedback - The array of feedback scores
 * @param {number} feedback[].rating - The rating that the student gave the module
 * @param {string} feedback[].feedback - The feedback/review that the student gave the module
 * @returns { number } Returns the average of the feedback scores provided by students rounded to the nearest 0.5 decimal.
 */

export const calculateRating = (feedback) => {
	try {
		let sum = 0
		feedback.map((rating) => {
			sum += rating.rating
		})

		return round_to_precision(sum / feedback.length, 0.5)
	} catch (error) {
		console.error(error)
		return null
	}
}
