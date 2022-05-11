import React, { useEffect, useState } from 'react'
import { getModule, loader } from '../helpers'
import axios from 'axios'
import moment from 'moment'

const PlanOfStudy = ({ param }) => {
	const [lessons, setLessons] = useState([])
	const [enrollment, setEnrollment] = useState(null)
	const [courses, setCourses] = useState(null)
	const [assignments, setAssignments] = useState(null)
	const [loading, setLoading] = useState(true)

	const getPlan = async () => {
		const payload = {
			query: `{
                        planByID(id: "${param}"){
                            id,
							student{
								id,
								email,
								firstName,
								lastName,
								dob
							},
							modules{
								id,
								enrolledAt,
								role,
								module{
									id,
									moduleName,
									moduleNumber
								},
							},
							courses{
								id,
								enrolledAt,
								course{
									name,
								}
							},
							assignmentResults{
								id,
								assignment{
									id,
									name,
									dueAt,
								},
								gradedBy{
									id,
									email,
									firstName,
									lastName
								},
								result,
								submittedAt
							}
                        }
                    }`,
		}
		const plan = await axios
			.post(`${process.env.REACT_APP_API}/graphql`, payload, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then(document => {
				setLoading(false)
				return document.data.data.planByID
			})
			.catch(err => {
				console.error(err)
			})
		return plan
	}

	useEffect(() => {
		getPlan()
			.then(response => {
				try {
					setEnrollment(response.modules)
					setCourses(response.courses)
					setAssignments(response.assignmentResults)
					// TODO: ALMP-222
					// response?.modules.forEach((id) => {
					// 	getModule(id)
					// 		.then((resp) => {
					// 			setLessons((lessons) => [
					// 				...lessons,
					// 				resp.data.data,
					// 			])
					// 			setLoading(false)
					// 		})
					// 		.catch((err) => {
					// 			console.error(err)
					// 		})
					// })
				} catch (error) {
					console.error(error)
					setLoading(false)
				}
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	return loading === true ? (
		loader()
	) : (
		<>
			<div className="lg:mb-2">
				<h1 className="text-lg font-semibold">My Modules</h1>
				<table className="border-collapse w-full">
					<thead>
						<tr>
							<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
								Enrolled At
							</th>
							<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
								Role
							</th>
							<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
								Module
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
						{enrollment.map((enrollment, index) => {
							let at = moment.unix(
								~~(enrollment.enrolledAt / 1000)
							)
							const enrolledAt = {
								day: at.format('DD'),
								month: at.format('MM'),
								year: at.format('YYYY'),
								time: at.format('hh:mm A'),
							}
							return (
								<tr
									key={index}
									className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
								>
									<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
										<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
											Enrolled At
										</span>
										{`${enrolledAt.day}/${enrolledAt.month}/${enrolledAt.year} ${enrolledAt.time}`}
									</td>
									<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
										<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
											Role
										</span>
										{enrollment.role}
									</td>
									<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
										<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
											Module
										</span>
										{enrollment.module.moduleNumber} -{' '}
										{enrollment.module.moduleName}
									</td>
									<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
										<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
											Progress
										</span>
										{/* <span className="rounded bg-red-400 py-1 px-3 text-xs font-bold"> */}
										some number that AI generates or
										whatever smart people say... 🤠
										{/* </span> */}
									</td>
									<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
										<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
											Actions
										</span>
										<button className="bg-red-700 text-red-50 hover:text-red-200 hover:bg-red-800 px-6 py-2">
											Abandon
										</button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
			<div className="lg:mb-2">
				<h1 className="text-lg font-semibold">My Courses</h1>
				<table className="border-collapse w-full">
					<thead>
						<tr>
							<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
								Enrolled At
							</th>
							<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
								Course
							</th>
							<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{courses.map((course, index) => {
							let at = moment.unix(~~(course.enrolledAt / 1000))
							const enrolledAt = {
								day: at.format('DD'),
								month: at.format('MM'),
								year: at.format('YYYY'),
								time: at.format('hh:mm A'),
							}
							return (
								<tr
									key={index}
									className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
								>
									<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
										<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
											Enrolled At
										</span>
										{`${enrolledAt.day}/${enrolledAt.month}/${enrolledAt.year} ${enrolledAt.time}`}
									</td>
									<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
										<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
											Course
										</span>
										{course.course.name}
									</td>
									<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
										<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
											Actions
										</span>
										<button className="bg-red-700 text-red-50 hover:text-red-200 hover:bg-red-800 px-6 py-2">
											Abandon
										</button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
			<div className="lg:mb-2">
				<h1 className="text-lg font-semibold">My Assignments</h1>
				<table className="border-collapse w-full">
					<thead>
						<tr>
							<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
								Due At
							</th>
							<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
								Submitted At
							</th>
							<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
								Assignment Name
							</th>
							<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
								Graded By
							</th>
							<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
								Result
							</th>
						</tr>
					</thead>
					<tbody>
						{assignments.map((assignment, index) => {
							console.log(assignment)
							let at = moment.unix(
								~~(assignment.submittedAt / 1000)
							)
							let due = moment.unix(
								~~(assignment.assignment.dueAt / 1000)
							)
							const enrolledAt = {
								day: at.format('DD'),
								month: at.format('MM'),
								year: at.format('YYYY'),
								hour: at.format('HH'),
								minute: at.format('mm'),
								time: at.format('hh:mm A'),
							}
							const dueAt = {
								day: due.format('DD'),
								month: due.format('MM'),
								year: due.format('YYYY'),
								hour: due.format('hh'),
								minute: due.format('mm'),
								time: at.format('hh:mm A'),
							}
							return (
								<tr
									key={index}
									className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
								>
									<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
										<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
											Due At
										</span>
										{`${dueAt.day}/${dueAt.month}/${dueAt.year} ${dueAt.time}`}
									</td>
									<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
										<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
											Submitted At
										</span>
										{`${enrolledAt.day}/${enrolledAt.month}/${enrolledAt.year} ${enrolledAt.time}`}
									</td>
									<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
										<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
											Course
										</span>
										{assignment.assignment.name}
									</td>
									<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
										<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
											Course
										</span>
										<a
											href={`mailto:${assignment.gradedBy.email}?subject=Question about assignment ${assignment.assignment.name}`}
											target="_blank"
											rel="noreferrer"
											className="underline text-blue-400"
										>
											{assignment.gradedBy.firstName}{' '}
											{assignment.gradedBy.lastName}
										</a>
									</td>
									<td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
										<span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
											Actions
										</span>
										<span
											className={`${
												assignment.result < 75
													? 'text-red-600'
													: null
											} ${
												assignment.result >= 75
													? 'text-yellow-600'
													: null
											} ${
												assignment.result >= 85
													? 'text-green-600'
													: null
											}`}
										>
											{assignment.result}
										</span>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default PlanOfStudy
