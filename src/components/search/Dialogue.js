import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const Dialogue = (props) => {
	const [combined, setCombined] = useState([])
	const [loading, setLoading] = useState(true)

	const { value, display, param } = props

	useEffect(() => {
		let data = JSON.stringify({
			query: value,
		})

		if (value.length > 0) {
			axios
				.post(
					`${process.env.REACT_APP_API}/api/search${
						param ? `?selection=${param}` : ""
					}`,
					data,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				)
				.then((res) => {
					console.log(res.data.data)
					setCombined(res.data.data)
					if (res.data.error) {
						setLoading(true)
					} else {
						setLoading(false)
					}
				})
				.catch((err) => {
					console.error(err)
				})
		}
	}, [value, param])

	console.log(combined)

	return (
		<div className={!loading && display ? "search--box" : ""}>
			{!loading && display
				? combined.map((item) => (
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
										ENMA {item.courseNumber} |{" "}
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
									? item.keywords.map((keyword, i) => (
											<span
												className="search--result__tags"
												key={i}
											>
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
