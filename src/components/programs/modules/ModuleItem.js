import React from "react"
import { Typography, Container, Grid, Link } from "@material-ui/core"
import StarRatingComponent from "react-star-rating-component"
import { rating, round_to_precision } from "../../helpers"
import { Loader } from "react-feather"

let ModuleItem = (props) => {
	const { modules, images, loading } = props

	console.log(images)
	const filterModules = (mod, text, variant) => {
		return (
			<>
				<h4 className="mt-3">{text}</h4>
				<div className="module--list">
					{mod.data.map((module, index) => (
						<Link href={`/modules/${module._id}`}>
							<div className="module--card shadow rounded">
								<img
									alt={
										images !== null &&
										images[index].alt_description
									}
									src={
										images !== null &&
										images[index].urls.thumb
									}
									title={
										images !== null &&
										images[index].alt_description
									}
									className="module--card__image card-img-top"
								/>
								<div className="module--card__content">
									<h4 className="text-bold">
										{module.moduleName}
									</h4>
									<h6 className="text-muted">
										{module.instructor}
									</h6>
									<Grid container className="w-100">
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
										<div className="flex flex-row">
											{module.keywords.map((keyword) => (
												<span className="badge badge-pill badge-secondary mx-1">
													{keyword}
												</span>
											))}
										</div>
									</Grid>
								</div>
							</div>
						</Link>
					))}
				</div>
			</>
		)
	}

	return loading ? (
		<Container className="mx-auto w-100 d-flex justify-content-center align-items-center">
			<Loader className="spin" size="42pt" />
		</Container>
	) : (
		<>{filterModules(modules, props.title)}</>
	)
}

export default ModuleItem
