import React, { Component } from "react";
import { Container } from "reactstrap";
import TempModuleFetch from "./ModuleItem";
import Search from "../search/Search";

class Modules extends Component {
  render() {
    return (
      <Container>
        <Search />
        <TempModuleFetch />
      </Container>
    );
  }
}
export default Modules;
