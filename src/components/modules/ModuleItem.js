import React, { Suspense } from "react"
import { fetchData } from "./ModuleFetch"
import {
	Typography,
	Card,
	CardContent,
	CardActions,
	Container,
	Button,
	ThemeProvider,
} from "@material-ui/core"
import StarRatingComponent from "react-star-rating-component"
import { rating, round_to_precision, progress } from "../helpers"
import { Loader } from "react-feather"

//storing fetch data return in resource protected variable for suspense
const resource = fetchData()

let ModuleItem = () => {
	return (
		<Suspense
			fallback={
				<Container className="mx-auto w-100 d-flex justify-content-center align-items-center">
					<Loader className="spin" size="42pt" />
				</Container>
			}
		>
			<ModuleData />
		</Suspense>
	)
}

const ModuleData = () => {
	const modules = resource.module.read()

	return (
		<>
			{RemainingModules(modules)}
			{IncompleteModules(modules)}
		</>
	)
}

//Pick up new modules
const RemainingModules = (modules) => {
	//filtering out modules that aren't done yet and storing in variable remaining
	let remaining = modules.data.filter((module) => module.done === false)

	const seen = new Set()
	const uniqueData = remaining.filter(({ sid }) => {
		if (seen.has(sid)) {
			return false
		}
		seen.add(sid)
		return true
	})

	return (
		<ThemeProvider>
			<Container>
				<Typography variant="h4" className="module--title">
					Pick up new modules
				</Typography>
				<div className="row">
					<div className="col">Module name</div>
					<div className="col">Rating</div>
					<div className="col">Enrolled</div>
					<div className="col">Actions</div>
				</div>
			</Container>
			{uniqueData.map((module) => (
				<Card
					className="module--list--item"
					key={module.moduleNumber}
					id={module._id}
				>
					<CardContent className="d-flex align-items-center w-100">
						<div className="row w-100 align-items-center">
							<div className="col">{module.moduleName}</div>
							<div
								className="col d-flex align-items-center"
								title={`Rating: ${rating(module.rating)}`}
							>
								<StarRatingComponent
									editing={false}
									name={`${module._id}Rating`}
									starCount={5}
									value={round_to_precision(
										rating(module.rating),
										0.5
									)}
								/>
							</div>
							<div className="col">{module.enrolled}</div>
							<div className="col actions d-flex flex-row">
								<CardActions>
									<Button
										color="primary"
										className="mx-2"
										size="small"
										onClick={() => {
											console.log(`accessed`)
										}}
									>
										Add module
									</Button>
								</CardActions>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</ThemeProvider>
	)
}

//Continue modules
const IncompleteModules = (modules) => {
	let completed = modules.data.filter((module) => module.continue === true)

	const seen = new Set()
	const uniqueData = completed.filter(({ sid }) => {
		if (seen.has(sid)) {
			return false
		}
		seen.add(sid)
		return true
	})

	return (
		<ThemeProvider>
			<Typography variant="h4" className="module--title">
				Continue your modules
			</Typography>
			<div className="row module--list">
				<div className="col">Module name</div>
				<div className="col">Progress</div>
				<div className="col">Remaining</div>
				<div className="col">Actions</div>
			</div>

			{uniqueData.map((module) => (
				<Card
					className="module--list--item"
					key={module.moduleNumber}
					id={module._id}
				>
					<CardContent className="d-flex align-items-center w-100">
						<div className="row w-100 align-items-center">
							<div className="col">{module.moduleName}</div>
							<div className="col">
								{progress(module.duration, module.remaining)}%
							</div>
							<div className="col">{module.duration} minutes</div>
							<div className="col actions d-flex flex-row">
								<Button
									href={`modules/${module._id}`}
									className="module--accessButton mx-2"
									size="small"
									color="primary"
									variant="outlined"
								>
									Continue module
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</ThemeProvider>
	)
}
export default ModuleItem
