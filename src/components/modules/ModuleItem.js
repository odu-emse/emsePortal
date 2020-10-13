import React, { useEffect, useState } from "react"
import { Typography, Container, Grid, Link } from "@material-ui/core"
import StarRatingComponent from "react-star-rating-component"
import { rating, round_to_precision } from "../helpers"
import { Loader } from "react-feather"
import Unsplash, { toJson } from "unsplash-js"
import axios from "axios"

const unsplash = new Unsplash({ accessKey: process.env.REACT_APP_IMAGE_ACCESS })

let ModuleItem = () => {
	//initial state is here since api requires are limited
	const initialImage = {
		urls: {
			thumb: "https://unsplash.com/photos/WpbEhnhuXrI",
		},
		description: "lorem",
	}
	const [image, setImage] = useState(null)
	const [modules, setModules] = useState(null)

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API}/api/modules`, {
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "no-cache",
				},
			})
			.then((res) => {
				let results = res.data
				console.log(res)
				setModules(results)
			})
			.catch((err) => console.log(err))

		unsplash.photos
			.getRandomPhoto({ orientation: "landscape" })
			.then(toJson)
			.then((json) => {
				console.log(json)
				setImage(json)
			})
			.catch((err) => {
				console.error(err)
			})
	}, [])

	const filterModules = (modules, text, variant) => {
		if (variant === "full") {
		} else if (variant === "featured") {
		} else if (variant === "related") {
		}
		return (
			<>
				<h4 className="mt-3">{text}</h4>
				<div className="module--list">
					{modules.data.map((module) => (
						<Link href={`/modules/${module._id}`}>
							<div className="module--card shadow rounded">
								<img
									alt={
										image === null
											? ""
											: image.alt_description
									}
									src={image === null ? "" : image.urls.thumb}
									title={
										image === null
											? ""
											: image.alt_description
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

	return modules === null ? (
		<Container className="mx-auto w-100 d-flex justify-content-center align-items-center">
			<Loader className="spin" size="42pt" />
		</Container>
	) : (
		<>
			{filterModules(modules, "Where you left off")}
			{filterModules(modules, "Featured modules")}
			{filterModules(modules, "Because you completed X module")}
		</>
	)
}

export default ModuleItem
