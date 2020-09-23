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
import { TextField, Grid } from "@material-ui/core"
import Dialogue from "./Dialogue"
import { Search as SearchIcon } from "react-feather"

const Search = () => {
	const [search, setSearch] = useState("")

	return (
		<>
			<Grid
				container
				spacing={1}
				alignItems="flex-end"
				className="w-100 justify-content-center"
			>
				<Grid item>
					<SearchIcon />
				</Grid>
				<Grid item className="search--input">
					<TextField
						className="w-100"
						label="Module name"
						name="moduleName"
						onChange={(e) => setSearch(e.target.value)}
					/>
				</Grid>
			</Grid>
			<Dialogue value={search} />
		</>
	)
}

export default Search
