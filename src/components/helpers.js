import jwt from "jsonwebtoken"

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
	let sum = arr.reduce((previous, current) => (current += previous))
	let avg = sum / arr.length
	return avg
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
	return "Bearer " + localStorage.getItem("JWT")
}

export const removeToken = () => {
	return localStorage.removeItem("JWT")
}

export const decoder = () => {
	const token = localStorage.getItem("JWT")
	const decoded = jwt.decode(token)
	return decoded.sub
}

export const convert = (timestamp) => {
	var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
		yyyy = d.getFullYear(),
		mm = ("0" + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
		dd = ("0" + d.getDate()).slice(-2), // Add leading 0.
		hh = d.getHours(),
		h = hh,
		min = ("0" + d.getMinutes()).slice(-2), // Add leading 0.
		ampm = "AM",
		time

	if (hh > 12) {
		h = hh - 12
		ampm = "PM"
	} else if (hh === 12) {
		h = 12
		ampm = "PM"
	} else if (hh === 0) {
		h = 12
	}

	// ie: 2013-02-18, 8:35 AM
	time = yyyy + "-" + mm + "-" + dd + ", " + h + ":" + min + " " + ampm

	return time
}

export const refreshPage = () => {
	window.location.reload()
}

//TODO: [ALMP-90] user id profile check

//TODO: [ALMP-98] course fetcher function
