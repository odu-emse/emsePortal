import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


class AppNavbar extends Component{
    state= {
        //adding default state of nav burger being closed
        isOpen: false
    }

    toggle = () => {
        this.setState({
            //checks if the nav burger is open or close
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return(
            <div>
                <Navbar color="light" light expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">
                            Asynchronous LMP
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/">Portal</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/">Dashboard</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink active href="/">Modules</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/">Assignments</NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        <FontAwesomeIcon icon={faUser} />
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>Profile</DropdownItem>
                                        <DropdownItem>Billing</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>Login</DropdownItem>
                                        <DropdownItem className='text-danger'>Logout</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default AppNavbar