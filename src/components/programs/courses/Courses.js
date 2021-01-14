import React from "react"
import { Loader } from "react-feather"
import { Link } from "react-router-dom"

const Courses = (props) => {
	const { courses, images, loading } = props
	let offset = Math.floor(Math.random() * 10)
	const filterCourses = (content, title, variant) => {
		return (
			<>
				<h4 className="my-3 text-3xl">{title}</h4>
				<div className="module--list grid grid-cols-5 gap-5 overflow-x-hidden">
					{content.data.map((course, index) => (
						<Link
							to={`/course/${course._id}`}
							className="hover:no-underline"
						>
							<div className="shadow-md mb-3 rounded bg-gray-100">
								<div className="flex items-center justify-center overflow-hidden max-h-56">
									<img
										alt={
											images === undefined
												? ""
												: images[index + offset]
														.alt_description
										}
										src={
											images === undefined
												? ""
												: images[index + offset].urls
														.thumb
										}
										title={
											images === undefined
												? ""
												: images[index + offset]
														.alt_description
										}
										className="min-w-full min-h-full flex-shrink-0"
									/>
								</div>
								<div className="p-2">
									<h4 className="font-bold text-xl">
										{course.courseName}
									</h4>
									<div container className="w-full">
										<div className="flex flex-row flex-wrap">
											{course.keywords.map((keyword) => (
												<span className="bg-blue-500 rounded-full text-xs text-white py-1 px-2 m-1">
													{keyword}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</>
		)
	}

	return loading ? (
		<div className="mx-auto w-full flex justify-center items-center">
			<Loader className="spin" size="42pt" />
		</div>
	) : (
		<>{filterCourses(courses, props.title)}</>
	)
}

export default Courses
