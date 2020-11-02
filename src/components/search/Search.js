import React, { useState, useEffect } from "react"
import {
	TextField,
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@material-ui/core"
import Dialogue from "./Dialogue"
import { Search as SearchIcon } from "react-feather"

const Search = () => {
	const [search, setSearch] = useState("")
	const [select, setSelect] = useState("")
	const [display, setDisplay] = useState(true)

	const change = (e) => {
		if (e.target.name === "select") {
			setSelect(e.target.value)
		}
		if (e.target.name === "query") {
			setSearch(e.target.value)
		}
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
				className="w-100 justify-content-between"
			>
				<Grid item className="search--select justify-content-center">
					<FormControl className="w-100">
						<InputLabel id="demo-simple-select-label">
							Modules and Courses
						</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={select}
							onChange={change}
							name="select"
						>
							<MenuItem value="" selected={true}>
								Modules and Courses
							</MenuItem>
							<MenuItem value="key">Keywords</MenuItem>
							<MenuItem value="instructor">Instructor</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid
					item
					className="search--input w-50 justify-content-center"
				>
					<TextField
						className="w-100"
						label="Module name"
						name="query"
						onChange={(e) => change(e)}
					/>
				</Grid>
				<Grid item className="search--icon justify-content-center">
					<SearchIcon className="w-100" />
				</Grid>
			</Grid>
			<Dialogue display={display} value={search} param={select} />
		</>
	)
}

export default Search
