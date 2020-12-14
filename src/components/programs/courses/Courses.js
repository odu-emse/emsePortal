import React from "react"
import { Container, Grid, Link } from "@material-ui/core"
import { Loader } from "react-feather"

const Courses = (props) => {
	const { courses, images, loading } = props

	const filterCourses = (content, title, variant) => {
		return (
			<>
				<h4 className="mt-3">{title}</h4>
				<div className="module--list">
					{content.data.map((course, index) => (
						<Link href={`/course/${course._id}`}>
							<div className="module--card shadow rounded">
								<img
									alt={
										images !== null &&
										images[index + 4].alt_description
									}
									src={
										images !== null &&
										images[index + 4].urls.thumb
									}
									title={
										images !== null &&
										images[index + 4].alt_description
									}
									className="module--card__image card-img-top"
								/>
								<div className="module--card__content">
									<h4 className="text-bold">
										{course.courseName}
									</h4>
									<Grid container className="w-100">
										<div className="flex flex-row">
											{course.keywords.map((keyword) => (
												<span className="badge badge-pill badge-secondary mx-1">
													{keyword}
												</span>
											))}
										</div>
									</Grid>
								</div>
							</div>
						</Link>
					))}
				</div>
			</>
		)
	}

	return loading ? (
		<Container className="mx-auto w-100 d-flex justify-content-center align-items-center">
			<Loader className="spin" size="42pt" />
		</Container>
	) : (
		<>{filterCourses(courses, props.title)}</>
	)
}

export default Courses
