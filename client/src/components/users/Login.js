import React, { Component } from "react";
import { Form, FormGroup, Input, Label, Col, Button } from "reactstrap";
import axios from "axios";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    token: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    let { email, password, token } = this.state;
    axios.post("/api/auth", { email, password }).then(res => {
      //console.log(res);
      //console.log(res.data);
      token = res.data.token;
      //console.log(token);
    });
  };
  handleChange = e => {
    e.preventDefault();
    if (e.target.type == "password") {
      this.setState({ password: e.target.value });
    } else {
      this.setState({ email: e.target.value });
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            onChange={this.handleChange}
            name="email"
            placeholder="with a placeholder"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            onChange={this.handleChange}
            name="password"
            placeholder="password placeholder"
          />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}
