import React, { Component } from "react"
import {
	Typography,
	TextField,
	ThemeProvider,
	Container,
	Button,
	Grid,
} from "@material-ui/core"
import { ArrowRight, ArrowLeft } from "react-feather"

export default class PersonalInfo extends Component {
	previous = (e) => {
		e.preventDefault()
		this.props.previousStep()
	}
	continue = (e) => {
		e.preventDefault()
		this.props.nextStep()
	}
	render() {
		const { values, change } = this.props
		console.log(values.group)
		if (values.group == "student") {
			this.props.nextStep()
			return null
		} else {
			return (
				<ThemeProvider>
					<Container maxWidth="md">
						<Typography variant="h3">
							Personal Information
						</Typography>
						<TextField
							label="Title"
							onChange={change("title")}
							defaultValue={values.title}
							fullWidth
							margin="normal"
						/>
						<TextField
							label="Office location"
							onChange={change("officeLocation")}
							defaultValue={values.officeLocation}
							fullWidth
							margin="normal"
						/>
						<TextField
							label="Office hours"
							onChange={change("officeHours")}
							defaultValue={values.officeHours}
							fullWidth
							margin="normal"
						/>
						<TextField
							label="Phone number"
							onChange={change("phone")}
							defaultValue={values.phone}
							fullWidth
							margin="normal"
						/>
						<TextField
							label="Contact policy"
							onChange={change("contactPolicy")}
							defaultValue={values.contactPolicy}
							fullWidth
							margin="normal"
							multiline
							rows={4}
							variant="filled"
						/>
						<TextField
							label="Background"
							onChange={change("background")}
							defaultValue={values.background}
							fullWidth
							margin="normal"
							multiline
							rows={4}
							variant="filled"
						/>
						<TextField
							label="Research interest"
							onChange={change("researchInterest")}
							defaultValue={values.researchInterest}
							fullWidth
							margin="normal"
						/>
						<TextField
							label="Selected papers and publications"
							onChange={change("selectedPapersAndPublications")}
							defaultValue={values.selectedPapersAndPublications}
							fullWidth
							margin="normal"
						/>
						<TextField
							label="Personal website"
							onChange={change("personalWebsite")}
							defaultValue={values.personalWebsite}
							fullWidth
							margin="normal"
						/>
						<TextField
							label="Philosophy"
							onChange={change("philosophy")}
							defaultValue={values.philosophy}
							fullWidth
							margin="normal"
							multiline
							rows={4}
							variant="filled"
						/>
						<Grid
							container
							direction="row"
							justify="space-evenly"
							alignItems="center"
						>
							<Button
								className="half mr-1"
								variant="contained"
								margin="normal"
								startIcon={<ArrowLeft />}
								onClick={this.previous}
							>
								Back
							</Button>
							<Button
								className="half ml-1"
								variant="contained"
								color="primary"
								endIcon={<ArrowRight />}
								onClick={this.continue}
							>
								Next
							</Button>
						</Grid>
					</Container>
				</ThemeProvider>
			)
		}
	}
}
