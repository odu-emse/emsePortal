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
				getModules{
					id,
					moduleName,
					moduleNumber,
					description,
					duration,
					numSlides,
					rating,
					keywords,
					hasAssignment,
					enrolled
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
				let results = await res.data.data.getModules
				setModules(results)
				setModulesLoading(false)
			})
			.catch((err) => console.error(err))

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

		console.log(image)
	}, [])

	return loadingImages || loadingModules ? (
		loader()
	) : (
		<div className="mx-20 px-10 max-w-full">
			{/* <Search /> */}
			<ModuleItem
				title="All modules"
				modules={modules}
				images={image}
				loading={loadingModules}
				imageLoading={loadingImages}
			/>
			{/* <Courses
				title="Courses you might be interested in"
				courses={courses}
				images={image[0]}
				loading={loadingCourses}
			/> */}
		</div>
	)
}

export default Modules
