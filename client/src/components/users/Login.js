import React, { Component } from "react";
import { Form, FormGroup, Input, Label, Button, Container } from "reactstrap";
import { getFromStorage, setInStorage } from "../helpers";

const localStorageObjectName = "login_system_storage";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      token: "",
      loading: true,
      registerError: "",
      registerEmail: "",
      registerPassword: "",
      loginError: "",
      loginEmail: "",
      loginPassword: "",
      firstName: "",
      lastName: ""
    };
    this.onTexboxChangeFirstName = this.onTexboxChangeFirstName.bind(this);
    this.onTexboxChangeLastName = this.onTexboxChangeLastName.bind(this);
    this.onTexboxChangeLoginEmail = this.onTexboxChangeLoginEmail.bind(this);
    this.onTexboxChangeLoginPassword = this.onTexboxChangeLoginPassword.bind(
      this
    );
    this.onTexboxChangeRegisterEmail = this.onTexboxChangeRegisterEmail.bind(
      this
    );
    this.onTexboxChangeRegisterPassword = this.onTexboxChangeRegisterPassword.bind(
      this
    );
    this.onLogin = this.onLogin.bind(this);
    this.onRegister = this.onRegister.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage(localStorageObjectName);
    if (obj && obj.token) {
      //verify token validity
      const { token } = obj;
      fetch(`http://localhost:5000/api/users/verify?token=${token}`)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              loading: false
            });
          } else {
            this.setState({
              loading: true
            });
          }
        })
        .catch(err => console.log(err));
    } else {
      this.setState({
        loading: false
      });
    }
  }

  onTexboxChangeLoginEmail(e) {
    this.setState({
      loginEmail: e.target.value
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
  onTexboxChangeLoginPassword(e) {
    this.setState({
      loginPassword: e.target.value
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

    fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: registerEmail,
        password: registerPassword
      })
    })
      .then(res => {
        res.json();
      })
      .then(json => {
        if (json.success) {
          this.setState({
            registerEmail: "",
            registerPassword: "",
            firstName: "",
            lastName: "",
            registerError: json.message,
            loading: false
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  onLogin() {
    const { loginEmail, loginPassword } = this.state;

    fetch("localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword
      })
    })
      .then(res => {
        res.json();
      })
      .then(json => {
        if (json.success) {
          setInStorage(localStorageObjectName, { token: json.token });
          this.setState({
            loginEmail: "",
            loginPassword: "",
            loginError: json.message,
            loading: false,
            token: json.token
          });
        } else {
          this.setState({
            loginError: json.message,
            loading: false
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const {
      token,
      loading,
      loginEmail,
      loginError,
      loginPassword,
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
          <br />
          <p>Login</p>
          <Form onSubmit={this.onLogin}>
            {loginError ? <p>{loginError}</p> : null}
            <FormGroup>
              <Label for="Email">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="email"
                value={loginEmail}
                onChange={this.onTexboxChangeLoginEmail}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Password">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="password"
                value={loginPassword}
                onChange={this.onTexboxChangeLoginPassword}
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
