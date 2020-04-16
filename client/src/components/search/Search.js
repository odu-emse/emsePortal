import React, { Component, Fragment } from "react";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Button
} from "reactstrap";
import Dialogue from "./Dialogue";
import axios from "axios";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modules: null
    };
  }

  render() {
    const { modules } = this.state;
    console.log(modules);
    return (
      <Fragment>
        <Label for="exampleEmail">Email</Label>
        <InputGroup className="">
          <Input className="" name="moduleName" placeholder="Module name" />
          <InputGroupAddon addonType="append">
            <Button color="primary" type="submit">
              Search
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <Dialogue />
      </Fragment>
    );
  }
}
