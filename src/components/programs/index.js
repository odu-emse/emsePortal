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
                            id,
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
				setModules(results)
				setModulesLoading(false)
			})
			.catch((err) => {
				console.error(err)
				setModulesLoading(false)
			})

		// TODO: course fetching
		axios
			.post(
				`${process.env.REACT_APP_API}/graphql`,
				{
					query: `{
                    courses{
                        id,
                        name,
                    }
                }`,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						'Cache-Control': 'no-cache',
					},
				}
			)
			.then(async (res) => {
				let results = await res.data.data.courses
				setCourses(results)
			})
			.catch((err) => console.error(err))

		getImages()
	}, [])

	// TODO: figure out how to filter modules by course
	const filterModules = (event) => {
		event.preventDefault()
		console.log(event.target.value)
		try {
			modules.filter((module) =>
				module.parentCourses.map(
					(item) => item.course.id === event.target.value
				)
			)
		} catch (error) {
			console.error(error)
			return null
		}
	}

	return loadingImages || loadingModules ? (
		loader()
	) : (
		<section className="px-10 w-full overflow-x-hidden flex">
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
					{courses &&
						courses.map((course) => (
							<button
								className="bg-gray-200 rounded-full my-2 px-2 cursor-pointer block text-left w-full"
								value={course.id.toString()}
								onClick={(e) => filterModules(e)}
								key={course.id}
							>
								{course.name}
							</button>
						))}
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
