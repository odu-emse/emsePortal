import React, { useState } from 'react'
import Dialogue from './Dialogue'
import { Search as SearchIcon } from 'react-feather'
import { AiOutlineSearch } from 'react-icons/ai'
import axios from 'axios'
import { loader } from '../helpers'

const Search = () => {
	const [search, setSearch] = useState('')
	const [results, setResults] = useState()
	const [open, setOpen] = useState(false)

	const getResults = async event => {
		event.preventDefault()
		if (search.length > 0) {
			try {
				const res = await axios.get(
					`${process.env.REACT_APP_DB_URL}/search?term=${search}`
				)
				setResults(res.data)
				setOpen(true)
			} catch (error) {
				console.error(error)
				throw new Error(error)
			}
		}
	}

	const handleInputChange = event => {
		setSearch(event.target.value)
		setOpen(false)
		if (search.length === 0 && results) {
			setResults(null)
			setOpen(false)
		}
	}

	return (
		<div className="relative">
			<section className="my-5 mb-0 w-full flex items-center justify-between">
				<div className="w-full relative">
					<form
						onSubmit={e => getResults(e)}
						className="flex items-center w-full"
					>
						<button type="submit" className="flex items-center">
							<AiOutlineSearch className="text-5xl opacity-50 absolute left-2" />
						</button>
						<input
							onChange={e => handleInputChange(e)}
							type="text"
							value={search}
							className="border-gray-300 shadow rounded w-full text-5xl px-14 py-2"
							placeholder="What are you looking for"
						/>
					</form>
				</div>
			</section>
			{open ? (
				<div className="absolute left-0 bottom-0 top-24 bg-gray-50 w-full h-fit shadow border border-gray-300">
					{results ? (
						results.length !== 0 ? (
							<>
								{results.map((result, i) => (
									<div
										className="px-2 py-4 flex border items-center justify-between border-transparent hover:bg-gray-300 hover:border-gray-400"
										key={i}
									>
										<div className="">
											<div className="flex items-center text-xl font-semibold mb-3">
												<p className="mr-1">
													M-
													{
														result.moduleNumber
															.$numberLong
													}{' '}
													|
												</p>
												<p>{result.moduleName}</p>
											</div>
											<div className="">
												{result.keywords.map(
													(keyword, index) => (
														<span
															className="bg-blue-300 rounded-full px-4 py-1 mx-1 inline-block font-light"
															key={index}
														>
															{keyword}
														</span>
													)
												)}
											</div>
										</div>
										<div className="italic text-gray-500 font-light font-serif text-sm">
											{Number(
												result.score.$numberDouble * 100
											).toFixed(2)}
											% match
										</div>
									</div>
								))}
							</>
						) : (
							<p className="text-lg">
								No results found for:{' '}
								<em className="text-blue-800 font-semibold">
									{search}
								</em>
							</p>
						)
					) : (
						loader()
					)}
				</div>
			) : null}
		</div>
	)
}

export default Search
