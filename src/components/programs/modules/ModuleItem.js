import React from 'react'
import StarRatingComponent from 'react-star-rating-component'
import { rating, round_to_precision, loader } from '../../helpers'
import { Link } from 'react-router-dom'
import { getRandomNum, calculateRating } from '../../helpers'

let ModuleItem = (props) => {
	const { modules, images, loading, imageLoading } = props

	const filterModules = (mod, text, variant) => {
		return mod ? (
			<section className="flex flex-col w-10/12">
				<h4 className="my-3 text-7xl opacity-20">{text}</h4>
				<div className="module--list flex flex-col">
					{mod.map((module, index) => (
						<Link
							to={`/modules/${module.id}`}
							className="hover:no-underline"
							key={module.id}
						>
							<div
								className={`p-2 flex justify-between shadow-md mb-3 rounded bg-gray-100 w-full border-l-8 border-red-500`}
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
								<div className="p-2 flex flex-col justify-between w-1/2">
									<div className="flex items-center">
										<h3 className="font-light text-lg">
											{module.parentCourses.map(
												(course) => {
													console.log(course)
													return course.course.name
												}
											)}{' '}
											| M-{module.moduleNumber}V
										</h3>
									</div>
									<div className="flex flex-col py-5">
										<h4 className="font-bold text-xl">
											{module.moduleName}
										</h4>
										<h6 className="font-light text-gray-500">
											{module.intro}
										</h6>
									</div>
									<div className="w-full">
										<div className="flex flex-row">
											<p className="text-yellow-400 mr-2 font-weight-light">
												{calculateRating(
													module.feedback
												)}
											</p>
											<StarRatingComponent
												name="module-rating"
												starCount={5}
												editing={false}
												value={calculateRating(
													module.feedback
												)}
											/>
											<p className="text-gray-300 ml-2 font-weight-light">
												({module.feedback.length})
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
								<div className="flex flex-col w-1/4 items-center justify-center text-center">
									<span className="font-light text-gray-400">
										75% <br /> Viewed
									</span>
									<svg class="w-20 h-20">
										<circle
											class="text-gray-300"
											stroke-width="5"
											stroke="currentColor"
											fill="transparent"
											r="30"
											cx="40"
											cy="40"
										/>
										<circle
											class="text-blue-600"
											stroke-width="5"
											stroke-dasharray="100"
											stroke-dashoffset="100 - 75 / 100 * 100"
											stroke-linecap="round"
											stroke="currentColor"
											fill="transparent"
											r="30"
											cx="40"
											cy="40"
										/>
									</svg>
									<h2 className="text-base font-semibold">
										Approximately {module.duration} hours
										left
									</h2>
								</div>
								<div className="flex flex-col w-1/4 items-center justify-center text-center">
									<span className="font-light text-gray-400 text-sm">
										Current Topic
									</span>
									<h2 className="text-lg font-semibold">
										Ethical Behavior and Leadership
									</h2>
									<button className="text-white bg-blue-300 px-3 py-1 w-full my-1">
										Continue
									</button>
									<button className="text-white bg-yellow-500 px-3 py-1 w-full my-1">
										Tree View
									</button>
								</div>
							</div>
						</Link>
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
		<>{filterModules(modules, props.title)}</>
	)
}

export default ModuleItem
