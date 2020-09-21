import React, { Component, Fragment } from "react"
import {
    Typography,
    TextField,
    FormControl,
    ThemeProvider,
    Container,
    Button,
    Grid,
    FormLabel,
    Radio,
    RadioGroup,
    FormControlLabel,
} from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
library.add(fas)

export default class UserInfo extends Component {
    continue = e => {
        e.preventDefault()
        this.props.nextStep()
    }
    render() {
        const { values, change } = this.props
        return (
            <ThemeProvider>
                <Container maxWidth="md">
                    <Typography variant="h3">User Information</Typography>
                    <TextField
                        label="First name"
                        onChange={change("firstName")}
                        defaultValue={values.firstName}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Last name"
                        fullWidth
                        margin="normal"
                        onChange={change("lastName")}
                        defaultValue={values.lastName}
                        required
                    />
                    <TextField
                        label="Middle name"
                        onChange={change("middleName")}
                        defaultValue={values.middleName}
                        helperText="Leave black if its not applicable"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        onChange={change("email")}
                        defaultValue={values.email}
                        type="email"
                        required
                    />
                    <TextField
                        label="Password"
                        onChange={change("password")}
                        defaultValue={values.password}
                        helperText="Minimum of 6 characters are required"
                        fullWidth
                        margin="normal"
                        type="password"
                        required
                    />
                    <TextField
                        label="Password confirmation"
                        fullWidth
                        margin="normal"
                        onChange={change("passwordConf")}
                        defaultValue={values.passwordConf}
                        type="password"
                        required
                    />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">
                            Are you a student, assistant or an instructor
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-label="group"
                            name="group"
                            onChange={change("group")}
                            required
                        >
                            <FormControlLabel
                                value="student"
                                checked={
                                    values.group == "student" ? true : false
                                }
                                control={<Radio />}
                                label="Student"
                            />
                            <FormControlLabel
                                value="assistant"
                                checked={
                                    values.group == "assistant" ? true : false
                                }
                                control={<Radio />}
                                label="Assistant"
                            />
                            <FormControlLabel
                                value="instructor"
                                checked={
                                    values.group == "instructor" ? true : false
                                }
                                control={<Radio />}
                                label="Instructor"
                            />
                        </RadioGroup>
                    </FormControl>
                    <Grid
                        container
                        direction="row"
                        justify="space-evenly"
                        alignItems="center"
                    >
                        <Button
                            className="half mr-1"
                            variant="contained"
                            disabled
                            margin="normal"
                            startIcon={
                                <FontAwesomeIcon icon={["fas", "caret-left"]} />
                            }
                        >
                            Back
                        </Button>
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
                            Next
                        </Button>
                    </Grid>
                </Container>
            </ThemeProvider>
        )
    }
}
