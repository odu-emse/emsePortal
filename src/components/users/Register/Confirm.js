import React, { Component } from "react"
import {
	Typography,
	ThemeProvider,
	Container,
	Button,
	Grid,
	List,
	ListItem,
	ListItemText,
} from "@material-ui/core"
import axios from "axios"
import { Redirect } from "react-router-dom"
import { ArrowRight, ArrowLeft } from "react-feather"

export default class Confirm extends Component {
	onRegister() {
		const {
			values: {
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
				contactPolicy,
				phone,
				background,
				researchInterest,
				selectedPapersAndPublications,
				personalWebsite,
				philosophy,
			},
		} = this.props

		let data = JSON.stringify({
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
			contactPolicy,
			phone,
			background,
			researchInterest,
			selectedPapersAndPublications,
			personalWebsite,
			philosophy,
		})

		axios
			.post(`${process.env.REACT_APP_API}/api/users/register`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				console.log(response)
				if (response.status === 200) {
					return <Redirect to="/users/login" />
					//TODO: [ALMP-105] undefined props.history
				}
			})
			.catch((err) => {
				return console.error(err)
			})
	}

	previous = (e) => {
		e.preventDefault()
		this.props.previousStep()
	}
	continue = (e) => {
		e.preventDefault()
		// handling form process using api in onRegister()
		this.onRegister()
	}
	render() {
		const {
			values: {
				firstName,
				lastName,
				middleName,
				email,
				group,
				title,
				officeLocation,
				officeHours,
				contactPolicy,
				phone,
				background,
				researchInterest,
				selectedPapersAndPublications,
				personalWebsite,
				philosophy,
			},
		} = this.props
		return (
			<ThemeProvider>
				<Container maxWidth="md">
					<Typography variant="h3">Confirm information</Typography>
					<Typography variant="h5">Account information</Typography>
					<List>
						<ListItem>
							<ListItemText
								primary={`First name: ${firstName}`}
							/>
						</ListItem>
						<ListItem>
							<ListItemText primary={`Last name: ${lastName}`} />
						</ListItem>
						<ListItem>
							<ListItemText
								primary={`Middle name: ${middleName}`}
							/>
						</ListItem>
						<ListItem>
							<ListItemText primary={`Email: ${email}`} />
						</ListItem>
						<ListItem>
							<ListItemText primary={`Group: ${group}`} />
						</ListItem>
						{group === "assistant" || group === "instructor" ? (
							<>
								<Typography variant="h5">
									Personal information
								</Typography>
								<ListItem>
									<ListItemText primary={`Title: ${title}`} />
								</ListItem>
								<ListItem>
									<ListItemText
										primary={`Office location: ${officeLocation}`}
									/>
								</ListItem>
								<ListItem>
									<ListItemText
										primary={`Office hours: ${officeHours}`}
									/>
								</ListItem>
								<ListItem>
									<ListItemText
										primary={`Phone number: ${phone}`}
									/>
								</ListItem>
								<ListItem>
									<ListItemText
										primary={`Contact policy: ${contactPolicy}`}
									/>
								</ListItem>
								<ListItem>
									<ListItemText
										primary={`Background: ${background}`}
									/>
								</ListItem>
								<ListItem>
									<ListItemText
										primary={`Research interests: ${researchInterest}`}
									/>
								</ListItem>
								<ListItem>
									<ListItemText
										primary={`Papers & Publications: ${selectedPapersAndPublications}`}
									/>
								</ListItem>
								<ListItem>
									<ListItemText
										primary={`Personal website: ${personalWebsite}`}
									/>
								</ListItem>
								<ListItem>
									<ListItemText
										primary={`Philosophy: ${philosophy}`}
									/>
								</ListItem>
							</>
						) : null}
					</List>
					<Grid
						container
						direction="row"
						justify="space-evenly"
						alignItems="center"
					>
						{group === "student" ? (
							<Button
								className="half mr-1"
								variant="contained"
								margin="normal"
								disabled
								startIcon={<ArrowLeft />}
							>
								Back
							</Button>
						) : (
							<Button
								className="half mr-1"
								variant="contained"
								margin="normal"
								startIcon={<ArrowRight />}
								onClick={this.previous}
							>
								Back
							</Button>
						)}
						<Button
							className="half ml-1"
							variant="contained"
							color="primary"
							endIcon={<ArrowRight />}
							onClick={this.continue}
						>
							Confirm & Continue
						</Button>
					</Grid>
				</Container>
			</ThemeProvider>
		)
	}
}
