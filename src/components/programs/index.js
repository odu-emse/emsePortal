import React, { useEffect, useState } from 'react'
import ModuleItem from './modules/ModuleItem'
import Search from '../search/Search'
import Courses from './courses/Courses'
import { createApi } from 'unsplash-js'
import axios from 'axios'
import { loader } from '../helpers'

const unsplash = createApi({
	accessKey: process.env.REACT_APP_IMAGE_ACCESS,
})

const Modules = () => {
	const [image, setImage] = useState([])
	const [modules, setModules] = useState(null)
	const [courses, setCourses] = useState(null)
	const [loadingModules, setModulesLoading] = useState(true)
	const [loadingCourses, setCoursesLoading] = useState(true)
	const [loadingImages, setImagesLoading] = useState(true)

	// TODO: find a better way to fetch images
	const getImages = async () => {
		setImage([
			{
				urls: {
					thumb: 'https://images.unsplash.com/photo-1602084115866-60d8e9d179d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1432&q=80',
				},
				description: 'lorem',
				alt_description: 'lorem',
			},
		])
		setImagesLoading(false)
		// try {
		// 	const { response } = await unsplash.photos.getRandom({
		// 		featured: true,
		// 		count: 1000,
		// 	})

		// 	setImagesLoading(false)
		// 	setImage([response])
		// } catch (err) {
		// 	console.error(err)
		// 	//initial state is here since api requests are limited
		// 	setImage([
		// 		{
		// 			urls: {
		// 				thumb: 'https://images.unsplash.com/photo-1602084115866-60d8e9d179d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1432&q=80',
		// 			},
		// 			description: 'lorem',
		// 			alt_description: 'lorem',
		// 		},
		// 	])
		// 	setImagesLoading(false)
		// }
	}

	useEffect(() => {
		let data = {
			query: `{
				modules{
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
		}

		axios
			.post(`${process.env.REACT_APP_API}/graphql`, data, {
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'no-cache',
				},
			})
			.then(async (res) => {
				let results = await res.data.data.modules
				console.log(results)
				setModules(results)
				setModulesLoading(false)
			})
			.catch((err) => {
				console.error(err)
				setModulesLoading(false)
			})

		// TODO: course fetching
		// axios
		// 	.post(`${process.env.REACT_APP_API}/graphql`, data, {
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			'Cache-Control': 'no-cache',
		// 		},
		// 	})
		// 	.then(async (res) => {
		// 		let results = await res.data
		// 		setCourses(results)
		// 		setCoursesLoading(false)
		// 	})
		// 	.catch((err) => console.error(err))

		getImages()
	}, [])

	return loadingImages || loadingModules ? (
		loader()
	) : (
		<section className="px-10 w-full overflow-x-hidden flex">
			{/* <Search /> */}
			<ModuleItem
				title="My Modules"
				modules={modules}
				images={image}
				loading={loadingModules}
				imageLoading={loadingImages}
			/>
			<aside className="w-2/12 pl-4">
				<ul>
					<p className="border-b border-gray-200 mt-1 font-semibold">
						Status
					</p>
					<li className="bg-gray-200 rounded-full my-2 px-2">All</li>
					<li className="bg-gray-200 rounded-full my-2 px-2">
						Overdue
					</li>
					<li className="bg-gray-200 rounded-full my-2 px-2">
						Completed
					</li>
					<p className="border-b border-gray-200 mt-1 font-semibold">
						Parent Courses
					</p>
					<li className="bg-gray-200 rounded-full my-2 px-2">
						ENMA 600
					</li>
					<li className="bg-gray-200 rounded-full my-2 px-2">
						ENMA 601
					</li>
					<li className="bg-gray-200 rounded-full my-2 px-2">
						ENMA 603
					</li>
					<li className="bg-gray-200 rounded-full my-2 px-2">
						ENMA 604
					</li>
					<li className="bg-gray-200 rounded-full my-2 px-2">
						ENMA 709
					</li>
					<p className="border-b border-gray-200 mt-1 font-semibold">
						Delivery Type
					</p>
					<li className="bg-gray-200 rounded-full my-2 px-2">
						Asynchronous Media
					</li>
					<li className="bg-gray-200 rounded-full my-2 px-2">
						Hands On
					</li>
					<li className="bg-gray-200 rounded-full my-2 px-2">
						Writing Intensive
					</li>
					<li className="bg-gray-200 rounded-full my-2 px-2">
						Presentation
					</li>
					<li className="bg-gray-200 rounded-full my-2 px-2">
						Activity
					</li>
					<li className="bg-gray-200 rounded-full my-2 px-2">
						Multiple Choice
					</li>
					<p className="border-b border-gray-200 mt-1 font-semibold">
						Legend
					</p>
					<li>Completed</li>
					<li>Overdue</li>
					<li>Available</li>
				</ul>
			</aside>
		</section>
	)
}

export default Modules
