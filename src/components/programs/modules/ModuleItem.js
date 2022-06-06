import React from 'react'
import StarRatingComponent from 'react-star-rating-component'
import { rating, round_to_precision, loader } from '../../helpers'
import { Link } from 'react-router-dom'
import { getRandomNum, calculateRating } from '../../helpers'
import Search from '../../search/Search'

let ModuleItem = (props) => {
	const { modules, images, loading, imageLoading } = props

	const filterModules = (mod) => {
		return mod ? (
			<section className="flex flex-col w-full mt-5">
				<div className="module--list flex flex-col items-center">
					{mod.map((moduleEnrollment, index) => (
						<div
							className={`p-2 flex flex-col md:flex-row justify-between shadow-md mb-3 rounded bg-gray-100 w-2/3 md:w-full border-l-8 border-red-500`}
							key={index}
						>
							{/* TODO: add view switching feature to make use of the images */}
							{/* <div className="flex items-center justify-center overflow-hidden max-h-56">
									<img
										alt={images[0]?.alt_description}
										src={images[0]?.urls?.thumb}
										title={images[0]?.alt_description}
										className="min-w-full min-h-full flex-shrink-0"
									/>
								</div> */}
							<div className="p-2 flex flex-col justify-between md:w-1/2 w-full">
								<div className="flex items-center">
									<h3 className="font-light text-lg">
										{/* TODO: see ALMP-238 and ALMP-229 */}
										{/* {moduleEnrollment.module.parentCourses.map(
											(course) => {
												return (
													course.course.name ||
													'Unknown'
												)
											}
										)} */}
										{`${moduleEnrollment.module.parentCourses[0].course.name} | M-${moduleEnrollment.module.moduleNumber}`}
									</h3>
								</div>
								<div className="flex flex-col py-5">
									<h4 className="font-bold text-xl">
										{moduleEnrollment.module.moduleName}
									</h4>
									<h6 className="font-light text-gray-500">
										{moduleEnrollment.module.intro}
									</h6>
								</div>
								<div className="w-full">
									<div className="flex flex-row">
										<p className="text-yellow-400 mr-2 font-weight-light">
											{calculateRating(
												moduleEnrollment.module.feedback
											)}
										</p>
										<StarRatingComponent
											name="module-rating"
											starCount={5}
											editing={false}
											value={calculateRating(
												moduleEnrollment.module.feedback
											)}
										/>
										<p className="text-gray-300 ml-2 font-weight-light">
											(
											{
												moduleEnrollment.module.feedback
													.length
											}
											)
										</p>
									</div>
									{/* TODO: find a way to work keywords into the design */}
									{/* <div className="flex flex-row flex-wrap">
											{module.keywords.map((keyword) => (
												<span className="bg-blue-500 rounded-full text-xs text-white py-1 px-2 m-1">
													{keyword}
												</span>
											))}
										</div> */}
									<ul className="flex justify-between items-center">
										<li className="underline font-extralight">
											Discussion
										</li>
										<li className="underline font-extralight">
											Assignments
										</li>
										<li className="underline font-extralight">
											Download
										</li>
										<li className="underline font-extralight">
											Abandon
										</li>
									</ul>
								</div>
							</div>
							<div className="flex flex-col md:w-1/4 w-full items-center justify-center text-center">
								<span className="font-light text-gray-400">
									75% <br /> Viewed
								</span>
								<svg className="w-20 h-20">
									<circle
										className="text-gray-300"
										strokeWidth="5"
										stroke="currentColor"
										fill="transparent"
										r="30"
										cx="40"
										cy="40"
									/>
									<circle
										className="text-blue-600"
										strokeWidth="5"
										strokeDasharray="100"
										strokeDashoffset="100 - 75 / 100 * 100"
										strokeLinecap="round"
										stroke="currentColor"
										fill="transparent"
										r="30"
										cx="40"
										cy="40"
									/>
								</svg>
								<h2 className="text-base font-semibold">
									Approximately{' '}
									{moduleEnrollment.module.duration} hours
									left
								</h2>
							</div>
							<div className="flex flex-col md:w-1/4 w-full items-center justify-center text-center">
								<span className="font-light text-gray-400 text-sm">
									Current Topic
								</span>
								<h2 className="text-lg font-semibold">
									Ethical Behavior and Leadership
								</h2>
								<Link
									to={`/program/${moduleEnrollment.module.id}`}
									className="text-white bg-blue-300 px-3 py-1 w-full my-1"
									key={moduleEnrollment.module.id}
								>
									Continue
								</Link>
								<Link
									to={`/program`}
									className="text-white bg-yellow-500 px-3 py-1 w-full my-1"
									key={moduleEnrollment.module.moduleName}
								>
									Tree View
								</Link>
							</div>
						</div>
					))}
				</div>
			</section>
		) : (
			<p className="text-3xl">Sorry, no modules could be found</p>
		)
	}

	return loading || imageLoading ? (
		loader()
	) : (
		<div className="flex flex-col md:w-full w-3/4">
			<h4 className="my-3 text-7xl opacity-20">My Modules</h4>
			<Search />
			{filterModules(modules)}
		</div>
	)
}

export default ModuleItem
