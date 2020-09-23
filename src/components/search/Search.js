import React, { useState, useEffect } from "react"
import {
	Form,
	FormGroup,
	Input,
	InputGroup,
	InputGroupAddon,
	Label,
	Button,
} from "reactstrap"
import Dialogue from "./Dialogue"
import axios from "axios"

const Search = () => {
	const [search, setSearch] = useState("")

	return (
		<>
			<Label for="exampleEmail">Email</Label>
			<InputGroup className="">
				<Input
					className=""
					name="moduleName"
					placeholder="Module name"
					onChange={(e) => setSearch(e.target.value)}
				/>
				<InputGroupAddon addonType="append">
					<Button color="primary" type="submit">
						Search
					</Button>
				</InputGroupAddon>
			</InputGroup>
			<Dialogue value={search} />
		</>
	)
}

export default Search
