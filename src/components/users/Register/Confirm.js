import React from "react"
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
import { ArrowRight, ArrowLeft } from "react-feather"
import { useHistory } from "react-router-dom"

const Confirm = (props) => {
	let history = useHistory()
	const { values } = props

	const onRegister = (val) => {
		const {
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
		} = val

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
					history.push("/users/login")
				}
			})
			.catch((err) => {
				return console.error(err)
			})
	}

	const previous = (e) => {
		e.preventDefault()
		props.previousStep()
	}
	const cont = (e) => {
		e.preventDefault()
		// handling form process using api in onRegister()
		onRegister(values)
	}
	const {
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
	} = values
	return (
		<ThemeProvider>
			<Container maxWidth="md">
				<Typography variant="h3">Confirm information</Typography>
				<Typography variant="h5">Account information</Typography>
				<List>
					<ListItem>
						<ListItemText primary={`First name: ${firstName}`} />
					</ListItem>
					<ListItem>
						<ListItemText primary={`Last name: ${lastName}`} />
					</ListItem>
					<ListItem>
						<ListItemText primary={`Middle name: ${middleName}`} />
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
							onClick={previous}
						>
							Back
						</Button>
					)}
					<Button
						className="half ml-1"
						variant="contained"
						color="primary"
						endIcon={<ArrowRight />}
						onClick={cont}
					>
						Confirm & Continue
					</Button>
				</Grid>
			</Container>
		</ThemeProvider>
	)
}

export default Confirm
