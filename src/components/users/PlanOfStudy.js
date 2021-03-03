import React, { useEffect, useState } from "react"
import { getModule, loader } from "../helpers"
import axios from "axios"

const PlanOfStudy = ({ param }) => {
	const [lessons, setLessons] = useState([])
	const [loading, setLoading] = useState(true)

	const getPlan = async () => {
		const plan = await axios
			.get(`${process.env.REACT_APP_API}/api/plan/${param}`, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((document) => {
				return document.data.data
			})
			.catch((err) => {
				console.error(err)
			})
		return plan
	}

	useEffect(() => {
		getPlan()
			.then((response) => {
				response.modules.forEach((id) => {
					getModule(id)
						.then((resp) => {
							setLessons((lessons) => [
								...lessons,
								resp.data.data,
							])
							setLoading(false)
						})
						.catch((err) => {
							console.error(err)
						})
				})
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	return loading === true ? (
		loader()
	) : (
		<>
			<table className="border-collapse w-full">
				<thead>
					<tr>
						<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
							Lesson number
						</th>
						<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
							Lesson name
						</th>
						<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
							Progress
						</th>
						<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{lessons.map((lesson, index) => (
						<tr
							key={index}
							className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
						>
							<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
								<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
									Lesson number
								</span>
								{lesson.moduleNumber}
							</td>
							<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
								<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
									Lesson name
								</span>
								{lesson.moduleName}
							</td>
							<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
								<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
									Progress
								</span>
								{/* <span className="rounded bg-red-400 py-1 px-3 text-xs font-bold"> */}
								some number that AI generates or whatever smart
								people say... 🤠
								{/* </span> */}
							</td>
							<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
								<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
									Actions
								</span>
								<a
									href="/"
									className="text-blue-400 hover:text-blue-600 underline"
								>
									Edit
								</a>
								<a
									href="/"
									className="text-blue-400 hover:text-blue-600 underline pl-6"
								>
									Remove
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

export default PlanOfStudy
