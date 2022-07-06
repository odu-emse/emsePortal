import { useEffect, useState } from 'react'
import axios from 'axios'
import {
	calculateRating,
	decoder,
	loader,
	rating,
	round_to_precision,
} from '../../helpers'
import StarRatingComponent from 'react-star-rating-component'
import pluralize from 'pluralize'
import { ToastContainer, toast } from 'react-toastify'
import {
	Award,
	Book,
	Check,
	Download,
	LifeBuoy,
	Repeat,
	Smartphone,
	Youtube,
} from 'react-feather'
import PropTypes from 'prop-types'

/**
 * @component
 * @name ModuleHousing
 * @category Program
 * @description This component renders the page that students see when they access a module. Including a video player, module listing, reviews of the module etc. This component also determines weather the user is enrolled in the module or not and displays the appropriate interface.
 * @returns {JSX.Element} The individual module's page
 */
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
				toast.success('You have successfully enrolled', {
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
				'Content-Type': 'application/json',
			},
		}
		axios
			.post(
				`${process.env.REACT_APP_API}/graphql`,
				{
					query: `{
                            module(id: "${params.moduleId}"){
                                id,
                                moduleNumber,
                                moduleName,
                                description,
                                duration,
                                intro,
                                numSlides,
                                keywords,
                                createdAt,
                                updatedAt,
                                feedback{
                                    feedback,
                                    rating
                                },
                                parentCourses{
                                    course{
                                        name
                                    }
                                }
                            }
                        }`,
				},
				config
			)
			.then((response) => {
				const module = response.data.data.module
				setModule(module)
				setContent(response.data.cd)
				//TODO: identify weather the user is enrolled or not
				// if (module.enrolled.includes(decoder())) {
				// 	setEnrolled(true)
				// } else {
				// 	setEnrolled(false)
				// }
				setEnrolled(false)
				setLoading(false)
			})
			.catch((err) => {
				console.error(err)
			})
	}, [params.moduleId])
	return loading ? (
		loader()
	) : enrolled ? (
		<>
			<ToastContainer />
			<div className="mx-auto max-w-7xl px-4 py-4">
				{/*TODO: we need to get content delivery working to get this fixed */}
				{/* <IframeResizer
					log
					src={`${content.href}/story.html`}
					style={{
						width: '1px',
						minWidth: '100%',
						minHeight: '75vh',
					}}
				/> */}
				<h1 className="text-3xl font-bold mt-4 mb-2">
					{module.moduleName}
				</h1>
				<p>{module.description}</p>
			</div>
		</>
	) : (
		<>
			<div className="mx-auto max-w-7xl py-4 px-4 w-3/4 sm:w-full xl:w-2/3">
				<div className="flex xl:flex-row flex-col-reverse">
					<div className="xl:w-2/3 w-full sm:mb-4 sm:mr-0 lg:mb-0 lg:mr-5">
						<h1 className="text-3xl font-bold mb-2">
							Module {module.moduleNumber} | {module.moduleName}
						</h1>
						<p className="mb-2">{module.intro}</p>
						<div className="w-full xl:w-1/2">
							<p className="font-light text-yellow-500 flex items-center">
								<span className="pr-2">
									{calculateRating(module.feedback)}
								</span>
								<StarRatingComponent
									name="module-rating"
									starCount={5}
									editing={false}
									value={calculateRating(module.feedback)}
								/>
								<span className="pl-2 text-gray-400">
									({module.feedback.length} ratings)
								</span>
								{/*TODO: we need to get member list to calculate this*/}
								{/* <span className="pl-2 text-gray-400">
									{pluralize(
										'student',
										module.enrolled.length,
										true
									)}
								</span> */}
							</p>
						</div>
						<p className="mb-4">
							Instructed by{' '}
							<a className="underline" href="./">
								{module.instructor}
							</a>
						</p>
						<div className="border shadow-md rounded-sm py-3 px-4 bg-gray-50 border-gray-50">
							<h3 className="text-lg font-bold">
								Module objectives
							</h3>
							{module.keywords.map((key, index) => (
								<div className="flex flex-row items-center mb-2">
									<span className="mr-3 text-gray-400">
										<Check />
									</span>
									<p className="mb-0 capitalize" key={index}>
										{key}
									</p>
								</div>
							))}
						</div>
						<div className="border shadow-md rounded-sm py-3 px-4 mt-3 bg-gray-50 border-gray-50">
							<h3 className="text-lg font-bold">
								Module description
							</h3>
							<p>{module.description}</p>
						</div>
						<div className="border shadow-md rounded-sm py-3 px-4 mt-3 bg-gray-50 border-gray-50">
							<h3 className="text-lg font-bold">Requirements</h3>
							<p>{module.description}</p>
						</div>
					</div>
					<div className="xl:w-1/3 w-full xl:border border-gray-50 px-3 py-4 rounded-sm xl:shadow-md">
						{/*TODO: we need to get content delivery working to get this fixed */}
						{/* <img
							src={`${content.href}/story_content/thumbnail.jpg`}
							alt={`${module.moduleName} module thumbnail`}
							className="w-full"
						/> */}
						<div className="module--housing--inclusion">
							<h5 className="mt-3 text-lg font-bold">
								This module includes:{' '}
							</h5>
							<span className="flex mt-3 font-light items-center">
								<div className="text-gray-400 mr-3">
									<Youtube />
								</div>
								{module.duration} hours on demand video
							</span>
							<span className="flex mt-3 font-light items-center">
								<div className="text-gray-400 mr-3">
									<Book />
								</div>
								{module.numSlides} interactive slides
							</span>
							<span className="flex mt-3 font-light items-center">
								<div className="text-gray-400 mr-3">
									<Download />
								</div>
								Downloadable resources
							</span>
							<span className="flex mt-3 font-light items-center">
								<div className="text-gray-400 mr-3">
									<Smartphone />
								</div>
								Available on mobile devices
							</span>
							<span className="flex mt-3 font-light items-center">
								<div className="text-gray-400 mr-3">
									<Repeat />
								</div>
								Lifetime access
							</span>
							<span className="flex mt-3 font-light items-center">
								<div className="text-gray-400 mr-3">
									<LifeBuoy />
								</div>
								On-demand helping professionals
							</span>
							<span className="flex mt-3 font-light items-center">
								<div className="text-gray-400 mr-3">
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
								className="bg-blue-400 rounded text-white py-2 px-4 w-full"
							>
								Enroll module
							</button>
							<button className="border-2 border-blue-300 rounded py-2 px-4 w-full mt-3">
								Favorite
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

ModuleHousing.propTypes = {
	/**
	 * The prop object that comes from `react-router-dom` that allows us to redirect users and check their url location
	 */
	props: PropTypes.object.isRequired,
}
