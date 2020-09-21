import React, { Component } from "react"
import {
    Typography,
    TextField,
    FormControl,
    ThemeProvider,
    Container,
    Button,
    Grid,
    List,
    ListItem,
    ListItemText,
} from "@material-ui/core"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
library.add(fas)

export default class Confirm extends Component {
    onRegister(e) {
        e.preventDefault()
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
            .post("/api/users/register", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(response => {
                console.log(response.data)
                this.props.history.push("/users/login")
            })
            .catch(err => {
                return console.error(err)
            })
    }

    previous = e => {
        e.preventDefault()
        this.props.previousStep()
    }
    continue = e => {
        e.preventDefault()
        // handle form process using api
        this.onRegister(e)
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
                        {group == "assistant" || group == "instructor" ? (
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
                        {group == "student" ? (
                            <Button
                                className="half mr-1"
                                variant="contained"
                                margin="normal"
                                disabled
                                startIcon={
                                    <FontAwesomeIcon
                                        icon={["fas", "caret-left"]}
                                    />
                                }
                            >
                                Back
                            </Button>
                        ) : (
                            <Button
                                className="half mr-1"
                                variant="contained"
                                margin="normal"
                                startIcon={
                                    <FontAwesomeIcon
                                        icon={["fas", "caret-left"]}
                                    />
                                }
                                onClick={this.previous}
                            >
                                Back
                            </Button>
                        )}
                        <Button
                            className="half ml-1"
                            variant="contained"
                            color="primary"
                            endIcon={
                                <FontAwesomeIcon
                                    icon={["fas", "caret-right"]}
                                />
                            }
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
