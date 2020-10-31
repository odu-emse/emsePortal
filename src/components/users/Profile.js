import React, { useState, useEffect } from "react"
import axios from "axios"
import { Container } from "@material-ui/core"
import { ToastContainer, toast } from "react-toastify"
import { convert, rating, round_to_precision } from "../helpers"
import StarRatingComponent from "react-star-rating-component"
import { Loader } from "react-feather"

const Profile = (props) => {
	const initialUserState = {
		user: {},
		modules: {},
		loading: false,
	}

	const {
		match: { params },
	} = props

	const [user, setUser] = useState(initialUserState)
	const [modules, setModule] = useState(initialUserState.modules)
	const [loading, setLoading] = useState(initialUserState.loading)

	const profile = user.user
	const module = modules

	useEffect(() => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		}
		const getUser = async (config) => {
			setLoading(true)
			const data = await axios
				.get(
					`${process.env.REACT_APP_API}/api/users/${params.id}`,
					config
				)
				.then((document) => {
					setLoading(false)
					return document.data
				})
				.catch((err) => {
					toast.error(err.response.data.error, {
						position: toast.POSITION.TOP_RIGHT,
					})
				})
			setUser(data)
		}

		const getModule = async (config) => {
			setLoading(true)
			const moduleData = await axios
				.get(`${process.env.REACT_APP_API}/api/modules`, config)
				.then((document) => {
					setLoading(false)
					return document.data.data
				})
				.catch((err) => {
					toast.error(err.response.data.error, {
						position: toast.POSITION.TOP_RIGHT,
					})
				})
			setModule(moduleData)
		}

		getModule(config)
		getUser(config)
	}, [])

	return loading ? (
		<Container className="mx-auto w-100 d-flex justify-content-center align-items-center">
			<Loader className="spin" size="42pt" />
		</Container>
	) : profile.group === "instructor" || profile.group === "adviser" ? (
		// instructor
		<div className="container row mx-auto">
			<ToastContainer />
			<nav className="col-4 nav flex-column">
				<a className="nav-link active" href="#user">
					User information
				</a>
				<a className="nav-link" href="#prof">
					Professor information
				</a>
				<a className="nav-link" href="#security">
					Security
				</a>
				<a className="nav-link" href="#notifications">
					Notifications
				</a>
				<a
					className="nav-link text-danger"
					aria-disabled="true"
					href="#kill"
				>
					Kill account
				</a>
			</nav>
			<div className="col-8">
				<h3 id="user">User information</h3>
				<form>
					{/* First name */}
					<div className="form-group">
						<label className="col-form-label">First name</label>
						<input
							className="form-control"
							type="text"
							placeholder="First name"
							name="firstName"
							defaultValue={profile.firstName}
						/>
					</div>

					{/* Last name */}
					<div className="form-group">
						<label className="col-form-label">Last name</label>
						<input
							className="form-control"
							type="text"
							placeholder="Last name"
							name="lastName"
							defaultValue={profile.lastName}
						/>
					</div>

					{/* Middle name */}
					<div className="form-group">
						<label className="col-form-label">Middle name</label>
						<input
							className="form-control"
							type="text"
							placeholder="Middle name"
							name="middleName"
							defaultValue={profile.middleName}
						/>
					</div>

					{/* Email */}
					<div className="form-group">
						<label className="col-form-label">Email</label>
						<input
							readOnly={true}
							className="form-control"
							type="email"
							disabled
							placeholder="Email"
							name="email"
							value={profile.email}
						/>
					</div>
				</form>
				<h3 id="prof">Professor information</h3>
				<form>
					<div className="form-group">
						<label className="col-form-label">Course purpose</label>
						<textarea
							type="text"
							className="form-control"
							placeholder="Course purpose"
						></textarea>
					</div>
					<div className="form-group">
						<label className="col-form-label">
							Course value added for students
						</label>
						<textarea
							type="text"
							className="form-control"
							placeholder="Course value added for students"
						></textarea>
					</div>
					<div className="form-group">
						<label className="col-form-label">
							Course content overview
						</label>
						<textarea
							type="text"
							className="form-control"
							placeholder="Course content overview"
						></textarea>
					</div>
					<div className="form-group">
						<label className="col-form-label">
							Course objectives
						</label>
						<textarea
							type="text"
							className="form-control"
							placeholder="Course objectives"
						></textarea>
					</div>
					<div className="form-group">
						<label className="col-form-label">
							Course approach
						</label>
						<textarea
							type="text"
							className="form-control"
							placeholder="Course approach"
						></textarea>
					</div>
				</form>
				<h3 id="security">Security</h3>
				<h3 id="notifications">Notifications</h3>
				<h3 id="kill">Kill account</h3>
			</div>
		</div>
	) : (
		// student
		<div className="container row mx-auto">
			<ToastContainer />
			<nav className="col-4 nav flex-column">
				{/* TODO: [ALMP-99] profile sidebar navigation */}
				<a className="nav-link active" href="#user">
					User information
				</a>
				<a className="nav-link" href="#modules">
					My modules
				</a>
				<a className="nav-link" href="#security">
					Security
				</a>
				<a className="nav-link" href="#notifications">
					Notifications
				</a>
				<a
					className="nav-link text-danger"
					aria-disabled="true"
					href="#kill"
				>
					Kill account
				</a>
			</nav>
			<div className="col-8">
				<h3 id="user">Profile</h3>
				<form>
					<input
						className="form-control"
						type="text"
						placeholder="First name"
						name="firstName"
						value={profile.firstName}
					/>
					<input
						className="form-control"
						type="text"
						placeholder="Last name"
						name="lastName"
						value={profile.lastName}
					/>
					<input
						className="form-control"
						type="text"
						placeholder="Middle name"
						name="middleName"
						value={profile.middleName}
					/>
					<input
						className="form-control"
						type="email"
						placeholder="Email"
						name="email"
						value={profile.email}
					/>
					<input
						className="form-control text-capitalize"
						type="text"
						placeholder="Adviser"
						name="adviser"
						disabled
						value={profile.group}
					/>
					<input
						className="form-control"
						type="text"
						placeholder="Probation expires"
						name="probationExpire"
						value={profile.probationExpire}
					/>
				</form>
				<h3 id="modules">My modules</h3>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Parent course</th>
							<th scope="col">Module name</th>
							<th scope="col">Progress</th>
							<th scope="col">Rating</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">1</th>
							<td>Mark</td>
							<td>Otto</td>
							<td>@mdo</td>
						</tr>
					</tbody>
				</table>
				<h3 id="security">Security</h3>
				<h3 id="notifications">Notifications</h3>
				<h3 id="kill">Kill account</h3>
			</div>
		</div>
	)
}

export default Profile
