import React, { useEffect, useState } from 'react'
import ModuleItem from './modules/ModuleItem'
import Search from '../search/Search'
import Courses from './courses/Courses'
import { createApi } from 'unsplash-js'
import axios from 'axios'
import { decoder, loader } from '../helpers'
import getPlanByStudentID from '../../scripts/getPlanByStudentID'

const unsplash = createApi({
	accessKey: process.env.REACT_APP_IMAGE_ACCESS,
})

const Modules = () => {
	const [image, setImage] = useState([])
	const [loading, setLoading] = useState(true)
	const [pos, setPoS] = useState(null)

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
		setLoading(false)
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

	const getPlan = async () => {
		try {
			getPlanByStudentID(decoder())
				.then((res) => {
					setPoS(res)
					setLoading(false)
				})
				.catch((err) => {
					throw new Error(err)
				})
		} catch (error) {
			throw new Error(error)
		}
	}

	useEffect(() => {
		getPlan()
	}, [])

	// TODO: figure out how to filter modules by course
	const filterModules = (event) => {
		event.preventDefault()
		console.log(event.target.value)
		try {
			const filteredModules = pos.modules.filter((moduleEnrollment) => {
				moduleEnrollment.module.parentCourses.map(
					(item) => item.course.id === event.target.value
				)
			})
			console.log(filteredModules)
		} catch (error) {
			console.error(error)
			return null
		}
	}

	return loading ? (
		loader()
	) : (
		<section className="gap-1 md:px-10 w-full flex flex-col md:flex-row">
			<ModuleItem
				title="My Modules"
				modules={pos.modules}
				images={image}
				loading={loading}
				imageLoading={loading}
			/>
			<aside className="w-full md:w-2/12 pl-4 overflow-x-scroll">
				<ul className="flex md:flex-col">
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
					{pos &&
						pos.courses.map((courseEnrollment) => (
							<button
								className="bg-gray-200 rounded-full my-2 px-2 cursor-pointer block text-left w-full"
								value={courseEnrollment.course.id.toString()}
								onClick={(e) => filterModules(e)}
								key={courseEnrollment.course.id}
							>
								{courseEnrollment.course.name}
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
