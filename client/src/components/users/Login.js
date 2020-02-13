import React from "react";
import { Form, FormGroup, Input, Label, Col, Button } from "reactstrap";

const Login = () => {
  return (
    <Form>
      <FormGroup row>
        <Label for="exampleEmail">Email</Label>
        <Col md={10}>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="with a placeholder"
          />
        </Col>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
};

export default Login;
