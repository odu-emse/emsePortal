import React, { useState, useEffect } from "react"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import { profileCheck, loader } from "../helpers"
import { useHistory } from "react-router-dom"
import PlanOfStudy from "./PlanOfStudy"

const Profile = (props) => {
	const token = localStorage.getItem(process.env.REACT_APP_JWT)
	const history = useHistory()

	const initialUserState = {
		user: {},
	}

	const {
		match: { params },
	} = props

	profileCheck(token, history, params)

	const [user, setUser] = useState(initialUserState)
	const [loading, setLoading] = useState(false)

	const profile = user.user

	useEffect(() => {
		const getUser = async () => {
			setLoading(true)
			const data = await axios
				.get(`${process.env.REACT_APP_API}/api/users/${params.id}`, {
					headers: {
						"Content-Type": "application/json",
					},
				})
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
		getUser()
	}, [])

	return loading === true ? (
		loader()
	) : (
		<>
			<div className="w-full max-w-6xl mx-4 lg:mx-auto flex flex-col md:flex-row mt-3">
				<ToastContainer />
				<nav className="w-full md:w-1/4 mr-8 flex flex-col border border-gray-200 shadow-sm rounded-md h-full">
					<a className="text-base" href="#user">
						<li className="py-1 px-3 hover:bg-gray-100 border-b border-gray-300 list-none">
							User information
						</li>
					</a>
					<a className="text-base" href="#modules">
						<li className="py-1 px-3 hover:bg-gray-100 border-b border-gray-300 list-none">
							Plan of Study
						</li>
					</a>
					<a className="text-base" href="#security">
						<li className="py-1 px-3 hover:bg-gray-100 border-b border-gray-300 list-none">
							Security
						</li>
					</a>
					<a className="text-base" href="#notifications">
						<li className="py-1 px-3 hover:bg-gray-100 border-b border-gray-300 list-none">
							Notifications
						</li>
					</a>
					<a className="text-base" href="#kill">
						<li className="py-1 px-3 hover:bg-gray-100 border-gray-300 list-none">
							Close account
						</li>
					</a>
				</nav>
				<div className="w-full md:w-3/4">
					<h3
						id="user"
						className="text-2xl bold border-b border-gray-100 mb-3"
					>
						Profile
					</h3>
					<form>
						<div className="flex md:flex-row md:justify-between flex-col mb-3">
							<label
								htmlFor="name"
								className="block flex-1 mr-2 font-bold"
							>
								First name
								<input
									className="bg-gray-50 border border-gray-200 rounded shadow-sm py-1 px-2 block w-full mt-1"
									type="text"
									placeholder="First name"
									name="firstName"
									value={profile.firstName}
								/>
							</label>
							<label
								htmlFor="name"
								className="block flex-1 mx-2 font-bold"
							>
								Middle name
								<input
									className="bg-gray-50 border border-gray-200 rounded shadow-sm py-1 px-2 block w-full mt-1"
									type="text"
									placeholder="Middle name"
									name="middleName"
									value={profile.middleName}
								/>
							</label>
							<label
								htmlFor="name"
								className="block flex-1 ml-2 font-bold"
							>
								Last name
								<input
									className="bg-gray-50 border border-gray-200 rounded shadow-sm py-1 px-2 block w-full mt-1"
									type="text"
									placeholder="Last name"
									name="lastName"
									value={profile.lastName}
								/>
							</label>
						</div>
						<div className="w-full mb-3">
							<label
								htmlFor=""
								className="block flex-1 font-bold"
							>
								Email
								<input
									className="bg-gray-50 border border-gray-200 rounded shadow-sm py-1 px-2 block w-full mt-1"
									type="email"
									placeholder="Email"
									name="email"
									value={profile.email}
								/>
							</label>
						</div>
						<div className="w-full mb-3">
							<label
								htmlFor=""
								className="block flex-1 font-bold"
							>
								Group
								<input
									className="bg-gray-50 border border-gray-200 rounded shadow-sm py-1 px-2 block w-full mt-1 capitalize cursor-not-allowed"
									type="text"
									placeholder="Group"
									name="adviser"
									disabled
									value={profile.group}
								/>
							</label>
						</div>
						<div className="w-full mb-3">
							<label
								htmlFor=""
								className="block flex-1 font-bold"
							>
								Date of birth
								<input
									className="bg-gray-50 border border-gray-200 rounded shadow-sm py-1 px-2 block w-full mt-1"
									type="text"
									placeholder="YYYY/MM/DD"
									name="dob"
									// value={profile.dob}
								/>
							</label>
						</div>
						{profile.group === "instructor" && (
							<>
								<div className="w-full mb-3">
									<label
										htmlFor=""
										className="block flex-1 font-bold"
									>
										Title
										<textarea
											className="bg-gray-50 border border-gray-200 rounded shadow-sm py-1 px-2 block w-full mt-1 capitalize"
											type="text"
											placeholder="Title"
											name="adviser"
										/>
									</label>
								</div>
								<div className="w-full mb-3">
									<label
										htmlFor=""
										className="block flex-1 font-bold"
									>
										Office location
										<input
											className="bg-gray-50 border border-gray-200 rounded shadow-sm py-1 px-2 block w-full mt-1 capitalize"
											type="text"
											placeholder="Office location"
											name="adviser"
										/>
									</label>
								</div>
								<div className="w-full mb-3">
									<label
										htmlFor=""
										className="block flex-1 font-bold"
									>
										Office hours
										<input
											className="bg-gray-50 border border-gray-200 rounded shadow-sm py-1 px-2 block w-full mt-1 capitalize"
											type="text"
											placeholder="Office hours"
											name="adviser"
										/>
									</label>
								</div>
								<div className="w-full mb-3">
									<label
										htmlFor=""
										className="block flex-1 font-bold"
									>
										Contact policy
										<textarea
											className="bg-gray-50 border border-gray-200 rounded shadow-sm py-1 px-2 block w-full mt-1 capitalize"
											type="text"
											placeholder="Contact policy"
											name="adviser"
										/>
									</label>
								</div>
								<div className="w-full mb-3">
									<label
										htmlFor=""
										className="block flex-1 font-bold"
									>
										Phone number
										<input
											className="bg-gray-50 border border-gray-200 rounded shadow-sm py-1 px-2 block w-full mt-1 capitalize"
											type="text"
											placeholder="Phone number"
											name="adviser"
										/>
									</label>
								</div>
								<div className="w-full mb-3">
									<label
										htmlFor=""
										className="block flex-1 font-bold"
									>
										Research interest
										<textarea
											className="bg-gray-50 border border-gray-200 rounded shadow-sm py-1 px-2 block w-full mt-1 capitalize"
											type="text"
											placeholder="Research interest"
											name="adviser"
										/>
									</label>
								</div>
								<div className="w-full mb-3">
									<label
										htmlFor=""
										className="block flex-1 font-bold"
									>
										Teaching philosophy
										<textarea
											className="bg-gray-50 border border-gray-200 rounded shadow-sm py-1 px-2 block w-full mt-1 capitalize"
											type="text"
											placeholder="Teaching philosophy"
											name="adviser"
										/>
									</label>
								</div>
							</>
						)}
					</form>
					<h3
						id="modules"
						className="text-2xl bold border-b border-gray-100 mb-3 mt-3"
					>
						Plan of Study
					</h3>
					<div className="">
						<PlanOfStudy param={params.id} />
					</div>
					<h3
						id="security"
						className="text-2xl bold border-b border-gray-100 mb-3 mt-3"
					>
						Security
					</h3>
					<div className="">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Suscipit beatae quam sint quis sapiente nobis esse! Et
						reprehenderit a eum laudantium earum? Voluptas aliquam,
						sit eaque in sed distinctio vitae!
					</div>
					<h3
						id="notifications"
						className="text-2xl bold border-b border-gray-100 mb-3 mt-3"
					>
						Notifications
					</h3>
					<div className="">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Suscipit beatae quam sint quis sapiente nobis esse! Et
						reprehenderit a eum laudantium earum? Voluptas aliquam,
						sit eaque in sed distinctio vitae!
					</div>
					<h3
						id="kill"
						className="text-2xl bold border-b border-gray-100 mb-3 mt-3"
					>
						Kill account
					</h3>
					<div className="">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Suscipit beatae quam sint quis sapiente nobis esse! Et
						reprehenderit a eum laudantium earum? Voluptas aliquam,
						sit eaque in sed distinctio vitae!
					</div>
				</div>
			</div>
		</>
	)
}

export default Profile
