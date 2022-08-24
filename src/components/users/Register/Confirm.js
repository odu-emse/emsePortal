import axios from 'axios'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { useHistory } from 'react-router-dom'

const Confirm = ({ previousStep, values }) => {
	let history = useHistory()
	const onRegister = (val) => {
		const {
			firstName,
			lastName,
			middleName,
			email,
			password,
			passwordConf,
			group,
			title,
			officeLocation,
			officeHours,
			contactPolicy,
			phone,
			background,
			researchInterest,
			selectedPapersAndPublications,
			personalWebsite,
			philosophy,
		} = val

		let data = {
			query: `
            mutation{
                createUser(input: {
                email: "${email}",
                firstName: "${firstName}",
                lastName: "${lastName}",
                middleName: "${middleName}",
                password: "${password}",
                passwordConf: "${passwordConf}",
            }){
                id
            }
            }`,
			variables: {
				email,
				firstName,
				lastName,
				middleName,
				password,
				passwordConf,
			},
		}

		axios
			.post(`${process.env.REACT_APP_API}/graphql`, data)
			.then((res) => {
				if (!res.data.errors) {
					history.push('/users/login')
				}
			})
			.catch((err) => {
				console.log(err)
				return null
			})
	}

	const previous = (e) => {
		e.preventDefault()
		previousStep()
	}
	const next = (e) => {
		e.preventDefault()
		// handling form process using api in onRegister()
		onRegister(values)
	}
	const {
		firstName,
		lastName,
		middleName,
		email,
		group,
		title,
		officeLocation,
		officeHours,
		contactPolicy,
		phone,
		background,
		researchInterest,
		selectedPapersAndPublications,
		website,
		philosophy,
	} = values
	return (
		<div className="lg:w-1/2 md:w-2/3 sm:mx-4 md:mx-auto my-4 bg-gray-100 py-5 px-3 rounded shadow border border-gray">
			<h1 className="text-3xl">Confirm account details</h1>
			<form className="w-full my-1">
				<h2 className="text-lg mt-3 border-gray-200 border-b">
					Account information
				</h2>
				<div className="my-3 w-full flex flex-col">
					<div className="my-1 ">
						<span className="text-gray-400">First name:</span>{' '}
						<span className="font-bold">{firstName}</span>
					</div>
					<div className="my-1 ">
						<span className="text-gray-400">Middle name:</span>{' '}
						<span className="font-bold">{middleName}</span>
					</div>
					<div className="my-1 ">
						<span className="text-gray-400">Last name:</span>{' '}
						<span className="font-bold">{lastName}</span>
					</div>
					<div className="my-1">
						<span className="text-gray-400">Email:</span>{' '}
						<span className="font-bold">{email}</span>
					</div>
					<div className="my-1">
						<span className="text-gray-400">Group:</span>{' '}
						<span className="font-bold">{group}</span>
					</div>
				</div>
				{group !== 'student' && (
					<>
						<h2 className="text-lg mt-3 border-gray-200 border-b">
							Personal information
						</h2>
						<div className="my-3 w-full flex flex-col">
							<div className="my-1 ">
								<span className="text-gray-400">Title:</span>{' '}
								<span className="font-bold">{title}</span>
							</div>
							<div className="my-1 ">
								<span className="text-gray-400">
									Office location:
								</span>{' '}
								<span className="font-bold">
									{officeLocation}
								</span>
							</div>
							<div className="my-1 ">
								<span className="text-gray-400">
									Office hours:
								</span>{' '}
								<span className="font-bold">{officeHours}</span>
							</div>
							<div className="my-1 ">
								<span className="text-gray-400">
									Phone number:
								</span>{' '}
								<span className="font-bold">{phone}</span>
							</div>
							<div className="my-1 ">
								<span className="text-gray-400">
									Contact policy:
								</span>{' '}
								<span className="font-bold">
									{contactPolicy}
								</span>
							</div>
							<div className="my-1 ">
								<span className="text-gray-400">
									Background:
								</span>{' '}
								<span className="font-bold">{background}</span>
							</div>
							<div className="my-1 ">
								<span className="text-gray-400">
									Research interests:
								</span>{' '}
								<span className="font-bold">
									{researchInterest}
								</span>
							</div>
							<div className="my-1 ">
								<span className="text-gray-400">
									Personal website:
								</span>{' '}
								<span className="font-bold">{website}</span>
							</div>
							<div className="my-1 ">
								<span className="text-gray-400">
									Philosophy:
								</span>{' '}
								<span className="font-bold">{philosophy}</span>
							</div>
						</div>
					</>
				)}
				<div className="w-full flex flex-row justify-between">
					<div className="w-full flex flex-row justify-between">
						<button
							className="text-gray-700 rounded py-2 px-4 bg-gray-300 bg-opacity-75 w-1/3 block transition-all hover:bg-gray-500 hover:text-white"
							type="reset"
							onClick={previous}
						>
							<span className="flex flex-row items-center justify-center">
								<ArrowLeft /> Back
							</span>
						</button>
						<button
							className="text-white rounded py-2 px-4 bg-blue-400 w-1/3 block transition-all hover:bg-blue-700"
							type="submit"
							onClick={next}
						>
							<span className="flex flex-row items-center justify-center">
								Complete sign up
								<ArrowRight />
							</span>
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default Confirm
