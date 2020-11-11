import React, { useEffect, useState } from "react"
import axios from "axios"
import { Container } from "@material-ui/core"
import { Loader } from "react-feather"
import { decoder, round_to_precision, rating } from "../../helpers"
import StarRatingComponent from "react-star-rating-component"
import pluralize from "pluralize"
import { ToastContainer, toast } from "react-toastify"

export default function ModuleHousing(props) {
	const {
		match: { params },
	} = props

	const [module, setModule] = useState([])
	const [loading, setLoading] = useState(true)
	const [enrolled, setEnrolled] = useState(false)

	const addModule = (id) => {
		axios
			.put(
				`${
					process.env.REACT_APP_API
				}/api/users/${decoder()}?module=${id}`,
				{},
				{}
			)
			.then(() => {
				window.location.reload()
				toast.success("You have successfully enrolled", {
					position: toast.POSITION.TOP_RIGHT,
				})
			})
			.catch((err) => {
				console.error(err)
			})
	}

	useEffect(() => {
		let config = {
			headers: {
				"Content-Type": "application/json",
			},
		}
		axios
			.get(
				`${process.env.REACT_APP_API}/api/modules/${params.moduleId}`,
				config
			)
			.then((response) => {
				const module = response.data.data
				setModule(module)
				if (module.enrolled.includes(decoder())) {
					setEnrolled(true)
				} else {
					setEnrolled(false)
				}
				setLoading(false)
			})
			.catch((err) => {
				console.error(err)
			})
	}, [params.moduleId])
	return loading ? (
		<Container className="mx-auto w-100 d-flex justify-content-center align-items-center">
			<Loader className="spin" size="42pt" />
		</Container>
	) : enrolled ? (
		<>
			<ToastContainer />
			<div className="container">
				<h1>{module.moduleName}</h1>
			</div>
		</>
	) : (
		<>
			<div className="container">
				<div className="row">
					<div className="col-md-9">
						<h1>
							Module {module.moduleNumber} | {module.moduleName}
						</h1>
						<p>{module.description}</p>
						<div className="module--rating row w-50">
							<p className="font-weight-light col text-warning d-flex align-items-center">
								<span className="pr-2">{`${round_to_precision(
									rating(module.rating),
									0.5
								)}`}</span>
								<StarRatingComponent
									name="module-rating"
									starCount={5}
									editing={false}
									value={round_to_precision(
										rating(module.rating),
										0.5
									)}
								/>
								<span className="pl-2 text-muted">
									({module.rating.length} ratings)
								</span>
								<span className="pl-2 text-muted">
									{pluralize(
										"student",
										module.enrolled.length,
										true
									)}
								</span>
							</p>
						</div>
						<p>
							Instructed by{" "}
							<a className="underline" href="./">
								{module.instructor}
							</a>
						</p>
						<div>
							<h3>What you'll learn</h3>
							<p>list of module objectives here</p>
						</div>
					</div>
					<div className="col-md-3">
						<img
							src={`${module.cdLink}/story_content/thumbnail.jpg`}
							alt={`${module.moduleName} thumbnail`}
						/>
						<button
							onClick={(e) => {
								addModule(module._id)
							}}
							className="btn btn-secondary"
						>
							Add module to your curriculum
						</button>
						<div className="my-4">
							<h5>This course will cover:</h5>
							<div>
								{module.keywords.map((key, index) => (
									<p key={index}>{key}</p>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
