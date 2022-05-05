import React, { useState } from 'react'
import Dialogue from './Dialogue'
import { Search as SearchIcon } from 'react-feather'
import { AiOutlineSearch } from 'react-icons/ai'
import axios from 'axios'

const Search = () => {
	const [search, setSearch] = useState('')
	const [select, setSelect] = useState('')
	const [results, setResults] = useState()

	const getResults = async (event) => {
		event.preventDefault()
		try {
			const res = await axios.get(
				`https://us-east-1.aws.data.mongodb-api.com/app/emseedge-qbmoy/endpoint/search?term=${search}&field=${select}`
			)
			setResults(res.data)
		} catch (error) {
			console.error(error)
			return null
		}
	}

	const change = (e) => {
		switch (e.target.value) {
			case 'title':
				setSelect('moduleName')
				break
			case 'number':
				setSelect('moduleNumber')
				break
			case 'key':
				setSelect('keywords')
				break
			case 'desc':
				setSelect('description')
				break
			case 'assignment':
				break
			default:
				break
		}
	}

	console.log(results)

	return (
		<div className="relative">
			<section className="my-5 mb-0 w-full flex items-center justify-between">
				<div className="w-full relative">
					<form
						onSubmit={(e) => getResults(e)}
						className="flex items-center w-full"
					>
						<button type="submit" className="flex items-center">
							<AiOutlineSearch className="text-5xl opacity-50 absolute left-0" />
						</button>
						<input
							onChange={(e) => setSearch(e.target.value)}
							type="text"
							value={search}
							className="border-gray-300 shadow rounded mr-3 w-full text-5xl px-14 py-2"
							placeholder="What are you looking for"
						/>
					</form>
				</div>
				<select name="field" onChange={(e) => change(e)}>
					<option value="title">Title</option>
					<option value="number">Number</option>
					<option value="key">Keyword</option>
					<option value="desc">Description</option>
					<option value="assg">Assignment</option>
				</select>
			</section>
			{search ? (
				<div className="absolute left-0 bottom-0 top-24 bg-gray-50 w-full h-32 shadow px-4 py-1 border border-gray-300">
					{results && results.length !== 0 ? (
						<>
							{results.map((result) => (
								<div className="">
									<p>{result.moduleNumber} | </p>
									<p>{result.moduleName}</p>
								</div>
							))}
						</>
					) : (
						<p>No results found for...</p>
					)}
				</div>
			) : null}
		</div>
	)
}

export default Search
