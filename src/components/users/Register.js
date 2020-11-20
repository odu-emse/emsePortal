import React, { Component } from "react"
import { getToken } from "../helpers"
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"
import UserInfo from "./Register/UserInfo"
import PersonalInfo from "./Register/PersonalInfo"
import Confirm from "./Register/Confirm"
import Success from "./Register/Success"

export default class Register extends Component {
	state = {
		loading: true,
		error: "",
		step: 1,
		firstName: "",
		lastName: "",
		middleName: "",
		email: "",
		password: "",
		passwordConf: "",
		group: null,
		title: "",
		officeLocation: "",
		officeHours: "",
		phone: "",
		contactPolicy: "",
		background: "",
		researchInterest: "",
		selectedPapersAndPublications: "",
		personalWebsite: "",
		philosophy: "",
	}

	//next step
	//renders errors upon incompletion and allows progress if no errors are present
	nextStep = () => {
		const {
			step,
			password,
			passwordConf,
			firstName,
			lastName,
			email,
			group,
		} = this.state
		if (
			firstName.length === 0 ||
			lastName.length === 0 ||
			email.length === 0 ||
			group == null
		) {
			this.setState({
				step: 1,
			})
			toast.error(
				"Please make sure that the required fields are filled out",
				{
					position: toast.POSITION.TOP_RIGHT,
				}
			)
		} else if (password.length <= 6 || passwordConf.length <= 6) {
			this.setState({
				step: 1,
			})
			toast.error(
				"Please make sure that your password is at least 6 characters long",
				{
					position: toast.POSITION.TOP_RIGHT,
				}
			)
		} else if (password !== passwordConf) {
			this.setState({
				step: 1,
			})
			toast.error("Please make sure that your password match", {
				position: toast.POSITION.TOP_RIGHT,
			})
		} else {
			this.setState({
				step: step + 1,
			})
		}
	}

	//previous step
	previousStep = () => {
		const { step } = this.state
		this.setState({
			step: step - 1,
		})
	}

	change = (input) => (e) => {
		this.setState({
			[input]: e.target.value,
		})
		if (input === "email") {
			const email = e.target.value
			const checkTaken = async (id) => {
				const users = await axios.get(
					`${process.env.REACT_APP_API}/api/users/`
				)
				users.data.data.map((user) => {
					if (user.email === id) {
						return toast.error(
							"Account with this email already exists. Please log in",
							{
								position: toast.POSITION.TOP_RIGHT,
							}
						)
					} else {
						return null
					}
				})
			}
			checkTaken(email)
		}
	}

	render() {
		const {
			step,
			firstName,
			lastName,
			middleName,
			email,
			password,
			passwordConf,
			group,
			title,
			officeLocation,
			officeHours,
			phone,
			contactPolicy,
			background,
			researchInterest,
			selectedPapersAndPublications,
			personalWebsite,
			philosophy,
		} = this.state

		const values = {
			firstName,
			lastName,
			middleName,
			email,
			password,
			passwordConf,
			group,
			title,
			officeLocation,
			officeHours,
			phone,
			contactPolicy,
			background,
			researchInterest,
			selectedPapersAndPublications,
			personalWebsite,
			philosophy,
		}

		if (getToken() !== `Bearer ${null}`) {
			//if there is a token -> send them home
			return this.props.history.push("/")
		} else {
			switch (step) {
				case 1:
					return (
						<>
							<ToastContainer />
							<UserInfo
								nextStep={this.nextStep}
								change={this.change}
								values={values}
							/>
						</>
					)
				case 2:
					return (
						<>
							<ToastContainer />
							<PersonalInfo
								nextStep={this.nextStep}
								previousStep={this.previousStep}
								change={this.change}
								values={values}
							/>
						</>
					)
				case 3:
					return (
						<Confirm
							nextStep={this.nextStep}
							previousStep={this.previousStep}
							values={values}
						/>
					)
				case 4:
					return <Success />
				default:
					return null
			}
		}
	}
}
