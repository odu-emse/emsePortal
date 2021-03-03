import React, { useEffect, useState } from "react"
import ModuleItem from "./modules/ModuleItem"
import Search from "../search/Search"
import Courses from "./courses/Courses"
import Unsplash, { toJson } from "unsplash-js"
import axios from "axios"

const unsplash = new Unsplash({ accessKey: process.env.REACT_APP_IMAGE_ACCESS })

const Modules = () => {
	const [image, setImage] = useState([])
	const [modules, setModules] = useState(null)
	const [courses, setCourses] = useState(null)
	const [loadingModules, setModulesLoading] = useState(true)
	const [loadingCourses, setCoursesLoading] = useState(true)

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API}/api/modules`, {
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "no-cache",
				},
			})
			.then(async (res) => {
				let results = await res.data
				console.log(res)
				setModules(results)
				setModulesLoading(false)
			})
			.catch((err) => console.error(err))

		axios
			.get(`${process.env.REACT_APP_API}/api/course`, {
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "no-cache",
				},
			})
			.then(async (res) => {
				let results = await res.data
				console.log(res)
				setCourses(results)
				setCoursesLoading(false)
			})
			.catch((err) => console.error(err))

		unsplash.search
			.photos({
				orientation: "landscape",
				query: "mountain",
				per_page: 50,
			})
			.then(toJson)
			.then((json) => {
				setImage((image) => [...image, json.results])
			})
			.catch((err) => {
				console.error(err)
				//initial state is here since api requires are limited
				setImage({
					urls: {
						thumb:
							"https://images.unsplash.com/photo-1602084115866-60d8e9d179d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1432&q=80",
					},
					description: "lorem",
				})
			})
	}, [])

	return (
		<div className="mx-20 px-10 max-w-full">
			{/* <Search /> */}
			<ModuleItem
				title="Modules to continue"
				modules={modules}
				images={image[0]}
				loading={loadingModules}
			/>
			{/* <ModuleItem
				title="Popular modules"
				modules={modules}
				images={image}
				loading={loading}
			/>
			<ModuleItem
				title="Because you completed X module"
				modules={modules}
				images={image}
				loading={loading}
			/> */}
			<Courses
				title="Courses you might be interested in"
				courses={courses}
				images={image[0]}
				loading={loadingCourses}
			/>
		</div>
	)
}

export default Modules
