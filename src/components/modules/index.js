import React, {Component} from 'react'
import {Container} from '@material-ui/core'
import ModuleItem from "./ModuleItem";
import Search from "../search/Search";

export default class Modules extends Component {
    render() {
        return(
            <Container>
                <Search />
                <ModuleItem />
            </Container>
        )
    }
}