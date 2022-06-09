import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { loader, profileCheck } from '../helpers'
import { useHistory } from 'react-router-dom'
import PlanOfStudy from './PlanOfStudy'
import {
	InstructorProvider,
	useInstructorContext,
} from '../../scripts/instructorProfileContex'
import moment from 'moment'

/**
 * Functional component for displaying the student's profile page
 * @category Plan Of Study
 * @function
 * @component
 * @param {React.FC<Props>} props - React props object
 * @returns {React.ReactElement} The profile page of the user
 */
const Profile = (props) => {
	const token = localStorage.getItem(process.env.REACT_APP_JWT)
	const history = useHistory()

	const {
		match: { params },
	} = props

	profileCheck(token, history, params)

	const instructor = useInstructorContext()

	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const [isInstructor, setIsInstructor] = useState(false)
	const [showInstructor, setShowInstructor] = useState(false)

	/**
	 * @summary Asynchronous function for fetching the user's profile based on the URL parameter containing the user's ID
	 * @function
	 * @returns {Object} The user's object
	 */
	const getUser = async () => {
		let payload = {
			// language=GraphQL
			query: `{
				user(id: "${params.id}" ){
					firstName,
					lastName,
                    middleName
					email,
                    isAdmin,
                    dob,
                    plan{
                        id,
                        modules{
                            role
                        }
                    }
				}
			}`,
		}

		const data = await axios
			.post(`${process.env.REACT_APP_API}/graphql`, payload, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((document) => {
				return document.data.data.user
			})
			.catch((err) => {
				toast.error(err.response.data.error, {
					position: toast.POSITION.TOP_RIGHT,
				})
			})
		setUser(data)
		return data
	}

	/**
	 * @summary Asynchronous function for updating the user's profile. This function is called when the user submits the update profile form.
	 * @function
	 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e - The event object of the form
	 */
	const updateUser = async (e) => {
		setLoading(true)
		e.preventDefault()
		if (user.dob) {
			const dob = user.dob.split('/')
			const mom = moment()
			await mom.set({
				year: dob[0],
				month: dob[1],
				date: dob[2],
			})
			await setUser({ ...user, dob: mom.unix() })
		}
		const payload = {
			query: `mutation{
                        updateUser(input: {
                            id: "${params.id}",
                            middleName: "${user.middleName}",
                            firstName: "${user.firstName}",
                            lastName: "${user.lastName}",
                            email: "${user.email}",
                            password: "${user.password}",
                            passwordConf: "${user.passwordConf}",
                            dob: "${user.dob}",
                            ${
								isInstructor
									? `instructorProfile: {
										title: "${instructor.state.instructorProfile.title || ''}",
									    officeLocation: "${
											instructor.state.instructorProfile
												.officeLocation || ''
										}",
									    officeHours: "${instructor.state.instructorProfile.officeHours || ''}",
									    contactPolicy: "${instructor.state.instructorProfile.contactPolicy || ''}",
									    phone: "${instructor.state.instructorProfile.phone || ''}",
									    background: "${instructor.state.instructorProfile.background || ''}",
									    researchInterest: "${
											instructor.state.instructorProfile
												.researchInterest || ''
										}",
									    selectedPapersAndPublications: "${
											instructor.state.instructorProfile
												.selectedPapersAndPublications ||
											''
										}",
									    personalWebsite: "${
											instructor.state.instructorProfile
												.personalWebsite || ''
										}",
									    philosophy: "${instructor.state.instructorProfile.philosophy || ''}"
									}`
									: ''
							}
                            }){
                            firstName,
                            lastName,
                            middleName,
                            email,
                            dob,
                            instructorProfile{
                                title,
                                phone,
                                officeHours,
                                officeLocation,
                            }
                        }
                    }`,
		}
		await axios
			.post(`${process.env.REACT_APP_API}/graphql`, payload, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((res) => {
				if (res.data) {
					setLoading(false)
					setUser(res.data.data.updateUser)
					toast.success('Your profile was updated!', {
						position: toast.POSITION.TOP_RIGHT,
					})
				} else {
					setLoading(false)
					toast.error('There was an error updating your profile', {
						position: toast.POSITION.TOP_RIGHT,
					})
				}
			})
			.catch((err) => {
				setLoading(false)
				err.response.data.errors.map((error) => {
					toast.error(error.message, {
						position: toast.POSITION.TOP_RIGHT,
					})
				})
			})
	}

	/**
	 * @summary Asynchronous function for deleting the user's profile. This function is called when the user clicks on the delete account button.
	 * @function
	 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e - The event object of the form
	 */
	const deleteUser = async (e) => {
		e.preventDefault()
		const payload = {
			query: `mutation{
                        deleteUser(id: "${params.id}"){
                            id
                        }
                    }`,
		}
		await axios
			.post(`${process.env.REACT_APP_API}/graphql`, payload, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then(() => {
				setLoading(false)
				props.history.push('/users/register')
			})
			.catch((err) => {
				toast.error(err.response.data.error, {
					position: toast.POSITION.TOP_RIGHT,
				})
			})
	}

	/**
	 * @summary Helper function for checking if the user has any enrollments as an instructor.
	 * @function
	 * @param {Object} usr - The user's profile object
	 */
	const toggleInstructor = (usr) => {
		console.log(
			'User: ',
			usr.plan.modules.find((m) => m.role === 'GRADER')
		)
		user?.plan?.modules.map((module) => {
			console.log(module)
			if (module.role === 'TEACHER' || module.role === 'GRADER') {
				setIsInstructor(true)
			}
		})
	}

	/**
	 * @summary Function that handles the change between user's profile and instructor's profile. This function dispatches a reducer action with a 'SET_INSTRUCTOR_PROFILE' `type` and a `payload` of the field name and value that was changed.
	 * @function
	 * @param {React.ChangeEvent<HTMLInputElement>} event - The event object of the click event
	 * @example
	 *
	 * const handleInstructorProfileChange = (event) => {
	 *	instructor.dispatch({
	 *		type: 'SET_INSTRUCTOR_PROFILE',
	 *		payload: { [event.target.name]: event.target.value },
	 *	})
	 * }
	 * //returns [...{title: "Chair of the Department of Computer Science"}]
	 *
	 * return (
	 * <input
	 * 	type="text"
	 * 	name="title"
	 * 	value="Chair of the Department of Computer Science"
	 * 	onChange={(event) => handleInstructorProfileChange(event)}
	 * />
	 * )
	 */
	const handleInstructorProfileChange = (event) => {
		instructor.dispatch({
			type: 'SET_INSTRUCTOR_PROFILE',
			payload: { [event.target.name]: event.target.value },
		})
	}

	useEffect(() => {
		getUser().then((res) => {
			toggleInstructor(res)
			setLoading(false)
		})
	}, [showInstructor])

	return loading ? (
		loader()
	) : (
		<>
			<div className="w-11/12 lg:w-3/4 mx-4 lg:mx-auto flex flex-col md:flex-row mt-3">
				<ToastContainer />
				<nav className="w-full md:w-1/4 mr-8 flex flex-col border border-gray-200 shadow-sm rounded-md h-full">
					{isInstructor ? (
						<button
							onClick={() => setShowInstructor(!showInstructor)}
						>
							<li className="py-1 px-3 hover:bg-gray-100 border-b border-gray-300 list-none">
								Switch to Professor
							</li>
						</button>
					) : null}
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
									value={user.firstName}
									onChange={(e) =>
										setUser({
											...user,
											firstName: e.target.value,
										})
									}
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
									value={user.middleName}
									onChange={(e) =>
										setUser({
											...user,
											middleName: e.target.value,
										})
									}
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
									value={user.lastName}
									onChange={(e) =>
										setUser({
											...user,
											lastName: e.target.value,
										})
									}
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
									value={user.email}
									onChange={(e) =>
										setUser({
											...user,
											email: e.target.value,
										})
									}
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
									defaultValue={user.dob}
									onChange={(e) =>
										setUser({
											...user,
											dob: e.target.value,
										})
									}
								/>
							</label>
						</div>
						{showInstructor && (
							<>
								<div className="w-full mb-3">
									<label
										htmlFor=""
										className="block flex-1 font-bold"
									>
										Title
										<input
											className="bg-gray-50 border border-gray-200 rounded shadow-sm py-1 px-2 block w-full mt-1 capitalize"
											type="text"
											placeholder="Title"
											name="title"
											defaultValue={
												instructor.state
													.instructorProfile.title
											}
											onChange={(event) =>
												handleInstructorProfileChange(
													event
												)
											}
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
											name="officeLocation"
											defaultValue={
												instructor.state
													.instructorProfile
													.officeLocation
											}
											onChange={(event) =>
												handleInstructorProfileChange(
													event
												)
											}
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
											name="officeHours"
											defaultValue={
												instructor.state
													.instructorProfile
													.officeHours
											}
											onChange={(event) =>
												handleInstructorProfileChange(
													event
												)
											}
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
											placeholder="Contact policy"
											name="contactPolicy"
											defaultValue={
												instructor.state
													.instructorProfile
													.contactPolicy
											}
											onChange={(event) =>
												handleInstructorProfileChange(
													event
												)
											}
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
											name="phone"
											defaultValue={
												instructor.state
													.instructorProfile.phone
											}
											onChange={(event) =>
												handleInstructorProfileChange(
													event
												)
											}
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
											placeholder="Research interest"
											name="researchInterest"
											defaultValue={
												instructor.state
													.instructorProfile
													.researchInterest
											}
											onChange={(event) =>
												handleInstructorProfileChange(
													event
												)
											}
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
											placeholder="Teaching philosophy"
											name="philosophy"
											defaultValue={
												instructor.state
													.instructorProfile
													.philosophy
											}
											onChange={(event) =>
												handleInstructorProfileChange(
													event
												)
											}
										/>
									</label>
								</div>
							</>
						)}
						<div className="w-full mb-3 flex gap-4">
							<label
								htmlFor=""
								className="block flex-1 font-bold"
							>
								Password
								<input
									className="lg:basis-1/2 bg-gray-50 border border-gray-200 rounded shadow-sm py-1 px-2 block mt-1 w-full"
									type="password"
									placeholder="Password"
									name="password"
									defaultValue={user.password}
									onChange={(e) =>
										setUser({
											...user,
											password: e.target.value,
										})
									}
								/>
							</label>
							<label
								htmlFor=""
								className="block flex-1 font-bold"
							>
								Password Confirmation
								<input
									className="lg:basis-1/2 bg-gray-50 border border-gray-200 rounded shadow-sm py-1 px-2 block mt-1 w-full"
									type="password"
									placeholder="Password Confirmation"
									name="passwordConf"
									defaultValue={user.passwordConf}
									onChange={(e) =>
										setUser({
											...user,
											passwordConf: e.target.value,
										})
									}
								/>
							</label>
						</div>
						<button
							className="bg-blue-300 border-blue-200 rounded w-auto text-black px-4 py-2"
							onClick={(e) => updateUser(e)}
							type="submit"
						>
							Update profile
						</button>
					</form>
					<h3
						id="modules"
						className="text-2xl bold border-b border-gray-100 mb-3 mt-3"
					>
						My Plan of Study
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
						className="text-2xl bold border-b border-gray-100 text-red-500 mb-3 mt-3"
					>
						Danger zone
					</h3>

					<button
						className="text-white border-red-400 bg-red-500 rounded w-auto px-4 py-2"
						onClick={() => deleteUser()}
					>
						Kill account
					</button>
				</div>
			</div>
		</>
	)
}

export default Profile
