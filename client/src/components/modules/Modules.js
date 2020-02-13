import React, { Component } from "react";
import { Container } from "reactstrap";
import ModuleItem from "./ModuleItem";
import Search from "../search/Search";

class Modules extends Component {
  render() {
    return (
      <Container>
        <Search />
        <ModuleItem />
      </Container>
    );
  }
}
export default Modules;
