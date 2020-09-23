import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const Dialogue = (props) => {
	const [modules, setModule] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let data = JSON.stringify({
			query: props.value,
		})

		axios
			.post(`${process.env.REACT_APP_API}/api/search`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				console.log(res)
				setModule(res.data)
				setLoading(false)
			})
			.catch((err) => {
				console.error(err)
			})
	}, [props.value])

	return (
		<div className={!loading ? "search--box" : ""}>
			{!loading
				? modules.data.map((item) => (
						<div className="search--result" key={item._id}>
							<>
								{item.containingModules ? (
									<span className="search--result__label">
										Course
									</span>
								) : (
									<span className="search--result__label">
										Module
									</span>
								)}
								<div className="search--result__details">
									<span className="search--result__moduleCount">
										{item.numberOfModules} modules
									</span>
									<span className="search--result__diff">
										{item.difficulty} / 5 difficulty
									</span>
								</div>
							</>
							<Link
								to={
									item.containingModules
										? `/courses/${item._id}`
										: `/modules/${item._id}`
								}
								className="search--box__link"
							>
								{item.containingModules ? (
									<h1 className="search--result__title">
										EMSE {item.courseNumber} |{" "}
										{item.courseName}
									</h1>
								) : (
									<h1 className="search--result__title">
										Module {item.moduleNumber} |{" "}
										{item.moduleName}
									</h1>
								)}
							</Link>
							<>
								{item.keywords.length > 0
									? item.keywords.map((keyword) => (
											<span className="search--result__tags">
												{keyword}
											</span>
									  ))
									: null}
							</>
						</div>
				  ))
				: null}
		</div>
	)
}

export default Dialogue
