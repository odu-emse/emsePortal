import React, { Component } from "react"
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	Container,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownItem,
	DropdownMenu,
} from "reactstrap"
import { Link } from "react-router-dom"
import { getToken, decoder } from "./helpers"
import { User } from "react-feather"

class AppNavbar extends Component {
	state = {
		//adding default state of nav burger being closed
		isOpen: false,
	}

	toggle = () => {
		this.setState({
			//checks if the nav burger is open or close
			isOpen: !this.state.isOpen,
		})
	}

	render() {
		if (getToken() !== `Bearer ${null}`) {
			//user logged in
			return (
				<>
					<Navbar color="light" light expand="sm" className="mb-5">
						<Container>
							<NavbarBrand href="/">Asynchronous LMP</NavbarBrand>
							<NavbarToggler onClick={this.toggle} />
							<Collapse isOpen={this.state.isOpen} navbar>
								<Nav className="ml-auto" navbar>
									<Link to="/" className="nav-link">
										<NavItem>Portal</NavItem>
									</Link>

									<Link to="/dashboard" className="nav-link">
										<NavItem>Dashboard</NavItem>
									</Link>

									<Link to="/modules" className="nav-link">
										<NavItem>Modules</NavItem>
									</Link>

									<Link
										to="/assignments"
										className="nav-link"
									>
										<NavItem>Assignments</NavItem>
									</Link>

									<UncontrolledDropdown nav inNavbar>
										<DropdownToggle nav caret>
											<User />
										</DropdownToggle>
										<DropdownMenu right>
											<Link to={`/users/${decoder()}`}>
												<DropdownItem>
													Profile
												</DropdownItem>
											</Link>

											<Link to="/billing">
												<DropdownItem>
													Billing
												</DropdownItem>
											</Link>

											<DropdownItem divider />

											<Link to="/users/logout">
												<DropdownItem className="text-danger">
													Logout
												</DropdownItem>
											</Link>
										</DropdownMenu>
									</UncontrolledDropdown>
								</Nav>
							</Collapse>
						</Container>
					</Navbar>
				</>
			)
		} else {
			//user is not authenticated
			return (
				<>
					<Navbar color="light" light expand="sm" className="mb-5">
						<Container>
							<NavbarBrand href="/">Asynchronous LMP</NavbarBrand>
							<NavbarToggler onClick={this.toggle} />
							<Collapse isOpen={this.state.isOpen} navbar>
								<Nav className="ml-auto" navbar>
									<Link
										to="/users/login"
										className="nav-link"
									>
										<NavItem>Login</NavItem>
									</Link>

									<Link
										to="/users/register"
										className="nav-link"
									>
										<NavItem>Register</NavItem>
									</Link>
								</Nav>
							</Collapse>
						</Container>
					</Navbar>
				</>
			)
		}
	}
}

export default AppNavbar
