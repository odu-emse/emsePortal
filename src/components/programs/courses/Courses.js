import React from 'react'
import { getRandomNum, loader } from '../../helpers'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

/**
 * @component
 * @name Course
 * @description The Course component is used to display a course.
 * @category Program
 * @todo Update this component to be implemented into the new design
 * @returns {JSX.Element} The Course component
 */
const Courses = ({ courses, images, loading, title }) => {
	/**
	 * @function
	 * @name filteredCourses
	 * @description The Course component is used to display a course.
	 * @deprecated
	 * @memberof Course
	 * @param {Array} content - The array of course content objects to be filtered and rendered on the page
	 * @param {Object} content.data - The course content object that is rendered on the page
	 * @param {String} content.data._id - The course document ID
	 * @param {String} content.data.courseName - The course name
	 * @param {Array} [content.data.keywords] - The course keywords
	 * @param {string} title - The list title we want to use to contain the filtered list of courses
	 * @param {string} [variant] - The variant of the list that we are rendering. This should differentiate between recommended courses, enrolled courses, and other courses etc.
	 * @returns {React.ReactFragment} The Course component
	 */
	const filterCourses = (content, title, variant) => {
		return (
			<>
				<h4 className="my-3 text-3xl">{title}</h4>
				<div className="module--list grid grid-cols-5 gap-5 overflow-x-hidden">
					{content.data.map((course, index) => (
						<Link
							to={`/course/${course._id}`}
							className="hover:no-underline"
							key={index}
						>
							<div className="shadow-md mb-3 rounded bg-gray-100">
								<div className="flex items-center justify-center overflow-hidden max-h-56">
									<img
										alt={
											images[0][getRandomNum(0, 30)]
												?.alt_description
										}
										src={
											images[0][getRandomNum(0, 30)]?.urls
												?.thumb
										}
										title={
											images[0][getRandomNum(0, 30)]
												?.alt_description
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
											{course.keywords ??
												course.keywords.map(
													(keyword, idx) => (
														<span
															className="bg-blue-500 rounded-full text-xs text-white py-1 px-2 m-1"
															key={idx}
														>
															{keyword}
														</span>
													)
												)}
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

	return loading ? loader() : <>{filterCourses(courses, title)}</>
}

export default Courses

Courses.propTypes = {
	/**
	 * The courses object that has the course name, keywords, and course id
	 */
	courses: PropTypes.object.isRequired,
	/**
	 * The image array of objects coming from the unsplash API that has the url, alt description, and the id of the image
	 */
	images: PropTypes.arrayOf(PropTypes.object).isRequired,
	/**
	 * A simple boolean to determine if the component is in a loading state or completed loading
	 */
	loading: PropTypes.bool.isRequired,
	/**
	 * The course title that is extracted from the props object
	 */
	title: PropTypes.string.isRequired,
}
