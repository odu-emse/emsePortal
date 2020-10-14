import React, { useState, useEffect } from "react"
import { TextField, Grid } from "@material-ui/core"
import Dialogue from "./Dialogue"
import { Search as SearchIcon } from "react-feather"

const Search = () => {
	const [search, setSearch] = useState("")
	const [display, setDisplay] = useState(true)

	const change = (e) => {
		setSearch(e.target.value)
		if (e.keyCode === 8) {
			setDisplay(false)
		}
		if (e.target.value.length >= 2) {
			setDisplay(true)
		}
	}

	useEffect(() => {
		document.addEventListener("keydown", change)
	}, [])

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
						onChange={(e) => change(e)}
					/>
				</Grid>
			</Grid>
			<Dialogue display={display} value={search} />
		</>
	)
}

export default Search
