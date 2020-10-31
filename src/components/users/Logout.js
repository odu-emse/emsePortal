import React, { Component } from "react"
import { removeToken, getToken, refreshPage } from "../helpers"
import { Redirect } from "react-router-dom"

class Logout extends Component {
	state = {}

	render() {
		if (getToken() !== `Bearer ${null}` || getToken() !== undefined) {
			removeToken()
			return <Redirect to="/users/login" />
		} else {
			return this.props.location
		}
	}
}

export default Logout
