import React, { Component } from "react";
import { Form, FormGroup, Input, Label, Button, Container } from "reactstrap";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      token: "",
      error: ""
    };
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onLogin(e) {
    e.preventDefault();
    const { email, password } = this.state;

    let data = JSON.stringify({
      email,
      password
    });

    axios
      .post("http://localhost:5000/api/users/login", data, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        localStorage.setItem("JWT", res.data.token);
        this.props.history.push("/Dashboard");
      })
      .catch(err => {
        this.setState({
          error: err
        });
        console.error("onLogin() error: ", err);
      });
  }

  render() {
    const { token, email, error, password } = this.state;
    //form
    return (
      <Container>
        {error ? <p>error</p> : null}
        <p>Login</p>
        <Form onSubmit={e => this.onLogin(e)}>
          {error ? <p>{error}</p> : null}
          {email ? <p>{email}</p> : null}
          {password ? <p>{password}</p> : null}
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
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    );
  }
}
