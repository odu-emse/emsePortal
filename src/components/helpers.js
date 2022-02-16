import jwt from 'jsonwebtoken'
import axios from 'axios'
import { Loader } from 'react-feather'

/**
 * @params [x]: number to be rounded
 * @params [precision]: decimal position to round to
 * @return rounded float number
 */
export let round_to_precision = (x, precision) => {
	let y = +x + (precision === undefined ? 0.5 : precision / 2)
	return y - (y % (precision === undefined ? 1 : +precision))
}

export let rating = (arr) => {
	if (arr.length > 0) {
		let sum = arr.reduce((previous, current) => (current += previous))
		let avg = sum / arr.length
		return avg
	} else {
		return 0
	}
}

export let progress = (dur, rem) => {
	let perc = (rem / dur) * 100
	return Math.round(perc)
}

//TODO:further integration of this is needed in later release
export let abandonModule = (id) => {
	console.log(id)
}

export const getToken = () => {
	return 'Bearer ' + localStorage.getItem('JWT')
}

export const removeToken = () => {
	return localStorage.removeItem('JWT')
}

export const decoder = () => {
	const token = localStorage.getItem('JWT')
	const decoded = jwt.decode(token)
	if (decoded !== null) {
		return decoded.id
	} else {
		return null
	}
}

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

export const loader = () => {
	return (
		<div className="mx-auto w-full flex justify-center items-center">
			<Loader className="spin" size="42pt" />
		</div>
	)
}

export const profileCheck = (token, history, params) => {
	const cypher = jwt.decode(token)
	if (cypher.id !== params.id) {
		history.push(`/users/${cypher.id}`)
		window.location.reload()
	}
}

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

export const getRandomNum = (min, max) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min) + min)
}

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

//TODO: [ALMP-98] course fetcher function
