import React, { Component } from "react";
import { Form, FormGroup, Input, Label, Button, Container } from "reactstrap";
import axios from "axios";
import { getToken } from "../helpers";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: "",
      email: "",
      password: "",
      passwordConf: "",
      firstName: "",
      lastName: ""
    };
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onRegister(e) {
    e.preventDefault();
    const { email, password, passwordConf, firstName, lastName } = this.state;

    let data = JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      passwordConf
    });

    axios
      .post("/api/users/register", data, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        const {
          firstName,
          lastName,
          email,
          password,
          passwordConf
        } = response.data;
        this.setState({
          firstName,
          lastName,
          email,
          password,
          passwordConf,
          loading: false,
          error: false
        });
        this.props.history.push("/users/login");
      })
      .catch(err => {
        return console.error(err);
      });
  }

  render() {
    const {
      firstName,
      lastName,
      error,
      email,
      password,
      passwordConf
    } = this.state;
    if (getToken() !== `Bearer ${null}`) {
      //if there is a token -> send them home
      return this.props.history.push("/");
    } else {
      return (
        <Container>
          <p>Register</p>
          <Form onSubmit={e => this.onRegister(e)}>
            {error ? <p>{error}</p> : null}
            <FormGroup>
              <Label for="First name">First name</Label>
              <Input
                type="text"
                name="firstName"
                placeholder="First name"
                value={firstName}
                onChange={e => this.change(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Last name">Last name</Label>
              <Input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={lastName}
                onChange={e => this.change(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Email">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="email"
                value={email}
                onChange={e => this.change(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Password">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={e => this.change(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Password confirmation">Confirm password</Label>
              <Input
                type="password"
                name="passwordConf"
                placeholder="confirm password"
                value={passwordConf}
                onChange={e => this.change(e)}
              />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </Container>
      );
    }
  }
}
