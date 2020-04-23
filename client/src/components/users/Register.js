import React, { Component } from "react";
import { Form, FormGroup, Input, Label, Button, Container } from "reactstrap";
import axios from "axios";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: true,
      registerError: "",
      registerEmail: "",
      registerPassword: "",
      firstName: "",
      lastName: ""
    };
    this.onTexboxChangeFirstName = this.onTexboxChangeFirstName.bind(this);
    this.onTexboxChangeLastName = this.onTexboxChangeLastName.bind(this);
    this.onTexboxChangeRegisterEmail = this.onTexboxChangeRegisterEmail.bind(
      this
    );
    this.onTexboxChangeRegisterPassword = this.onTexboxChangeRegisterPassword.bind(
      this
    );
    this.onRegister = this.onRegister.bind(this);
  }

  async componentDidMount() {
    this.setState({
      loading: false
    });
  }

  onTexboxChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }
  onTexboxChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }
  onTexboxChangeRegisterEmail(e) {
    this.setState({
      registerEmail: e.target.value
    });
  }
  onTexboxChangeRegisterPassword(e) {
    this.setState({
      registerPassword: e.target.value
    });
  }

  onRegister() {
    const { registerEmail, registerPassword, firstName, lastName } = this.state;

    let data = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: registerEmail,
      password: registerPassword
    });

    axios
      .post("/api/users/register", data, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        res.json();
      })
      .then(response => {
        const { firstName, lastName, email, password } = response;
        this.setState({
          firstName,
          lastName,
          email,
          password,
          loading: false,
          error: false
        });
      })
      .catch(err => {
        return console.error(err);
      });
  }

  render() {
    const {
      token,
      loading,
      firstName,
      lastName,
      registerError,
      registerEmail,
      registerPassword
    } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }
    if (!token) {
      //form
      return (
        <Container>
          <p>Register</p>
          <Form onSubmit={this.onRegister}>
            {registerError ? <p>{registerError}</p> : null}
            <FormGroup>
              <Label for="First name">First name</Label>
              <Input
                type="text"
                name="firstName"
                placeholder="First name"
                value={firstName}
                onChange={this.onTexboxChangeFirstName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Last name">Last name</Label>
              <Input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={lastName}
                onChange={this.onTexboxChangeLastName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Email">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="email"
                value={registerEmail}
                onChange={this.onTexboxChangeRegisterEmail}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Password">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="password"
                value={registerPassword}
                onChange={this.onTexboxChangeRegisterPassword}
              />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </Container>
      );
    }
    return <p>account</p>;
  }
}
