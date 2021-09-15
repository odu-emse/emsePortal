import React from 'react'
import StarRatingComponent from 'react-star-rating-component'
import { rating, round_to_precision, loader } from '../../helpers'
import { Link } from 'react-router-dom'
import { getRandomNum } from '../../helpers'

let ModuleItem = (props) => {
	const { modules, images, loading, imageLoading } = props

	const filterModules = (mod, text, variant) => {
		console.log(mod)
		return (
			<>
				<h4 className="my-3 text-3xl">{text}</h4>
				<div className="module--list grid grid-cols-5 gap-5 overflow-x-hidden">
					{mod.map((module, index) => (
						<Link
							to={`/modules/${module.id}`}
							className="hover:no-underline"
							key={module.id}
						>
							<div className="shadow-md mb-3 rounded bg-gray-100">
								<div className="flex items-center justify-center overflow-hidden max-h-56">
									{/* //this is a temp solution using a statically fetched img into a 1D array */}
									<img
										alt={images[0]?.alt_description}
										src={images[0]?.urls?.thumb}
										title={images[0]?.alt_description}
										className="min-w-full min-h-full flex-shrink-0"
									/>
								</div>
								<div className="p-2">
									<h4 className="font-bold text-xl">
										{module.moduleName}
									</h4>
									<h6 className="font-light text-gray-500">
										{module.instructor}
									</h6>
									<div className="w-full">
										<div className="flex flex-row">
											<StarRatingComponent
												name="module-rating"
												starCount={5}
												editing={false}
												value={round_to_precision(
													rating(module.rating),
													0.5
												)}
											/>
											<p className="text-muted mx-2 font-weight-light">{`${round_to_precision(
												rating(module.rating),
												0.5
											)} (${module.rating.length})`}</p>
										</div>
										<div className="flex flex-row flex-wrap">
											{module.keywords.map((keyword) => (
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

	return loading || imageLoading ? (
		loader()
	) : (
		<>{filterModules(modules, props.title)}</>
	)
}

export default ModuleItem
