import React, { useEffect, useState } from "react"
import axios from "axios"
import { Container } from "@material-ui/core"
import { Loader } from "react-feather"
import { decoder, round_to_precision, rating } from "../../helpers"
import StarRatingComponent from "react-star-rating-component"
import pluralize from "pluralize"
import { ToastContainer, toast } from "react-toastify"
import {
	Download,
	Smartphone,
	Award,
	Youtube,
	Book,
	LifeBuoy,
	Repeat,
	Check,
} from "react-feather"

export default function ModuleHousing(props) {
	const {
		match: { params },
	} = props

	const [module, setModule] = useState([])
	const [content, setContent] = useState([])
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
				setContent(response.data.cd)
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
				<iframe
					src={`${content.href}/story.html`}
					title={`${module._id}`}
					frameBorder="0"
					className="module--media"
				></iframe>
				<h1>{module.moduleName}</h1>
				<p>{module.description}</p>
			</div>
		</>
	) : (
		<>
			<div className="container mb-5">
				<div className="row">
					<div className="col mr-5">
						<h1>
							Module {module.moduleNumber} | {module.moduleName}
						</h1>
						<p>{module.intro}</p>
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
						<div className="border shadow rounded py-3 px-5 module--housing__objectives">
							<h3>Module objectives</h3>
							{module.keywords.map((key, index) => (
								<div className="d-flex flex-row align-items-center mb-2">
									<span className="mr-3 text-muted">
										<Check />
									</span>
									<p
										className="mb-0 text-capitalize"
										key={index}
									>
										{key}
									</p>
								</div>
							))}
						</div>
						<div className="border shadow rounded py-3 px-5 mt-5 module--housing__objectives">
							<h3>Module description</h3>
							<p>{module.description}</p>
						</div>
						<div className="border shadow rounded py-3 px-5 mt-5 module--housing__objectives">
							<h3>Requirements</h3>
							<p>{module.description}</p>
						</div>
					</div>
					<div className="col-4 border col-4 px-3 py-4 rounded shadow module--housing__card">
						<img
							src={`${content.href}/story_content/thumbnail.jpg`}
							alt={`${module.moduleName} module thumbnail`}
							className="module--housing__img"
						/>
						<div className="module--housing--inclusion">
							<h5 className="mt-3">This module includes: </h5>
							<span className="d-flex mt-3 font-weight-light align-items-center">
								<div className="text-muted mr-3">
									<Youtube />
								</div>
								{module.duration} minutes on demand video
							</span>
							<span className="d-flex mt-3 font-weight-light align-items-center">
								<div className="text-muted mr-3">
									<Book />
								</div>
								{module.numSlides} interactive slides
							</span>
							<span className="d-flex mt-3 font-weight-light align-items-center">
								<div className="text-muted mr-3">
									<Download />
								</div>
								Downloadable resources
							</span>
							<span className="d-flex mt-3 font-weight-light align-items-center">
								<div className="text-muted mr-3">
									<Smartphone />
								</div>
								Available on mobile devices
							</span>
							<span className="d-flex mt-3 font-weight-light align-items-center">
								<div className="text-muted mr-3">
									<Repeat />
								</div>
								Lifetime access
							</span>
							<span className="d-flex mt-3 font-weight-light align-items-center">
								<div className="text-muted mr-3">
									<LifeBuoy />
								</div>
								On-demand helping professionals
							</span>
							<span className="d-flex mt-3 font-weight-light align-items-center">
								<div className="text-muted mr-3">
									<Award />
								</div>
								Certificate of completion
							</span>
						</div>
						<div className="d-flex flex-column my-3">
							<button
								onClick={(e) => {
									addModule(module._id)
								}}
								className="btn btn-secondary"
							>
								Enroll module
							</button>
							<button className="btn border border-info btn mt-3">
								Favorite
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
