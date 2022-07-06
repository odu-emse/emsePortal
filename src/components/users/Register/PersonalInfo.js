import React from 'react'
import { ArrowLeft, ArrowRight } from 'react-feather'

const PersonalInfo = ({ previousStep, nextStep, values, change }) => {
	const previous = (e) => {
		e.preventDefault()
		previousStep()
	}
	const next = (e) => {
		e.preventDefault()
		nextStep()
	}
	if (values.group === 'student') {
		nextStep()
		return null
	} else {
		return (
			<div className="lg:w-1/2 md:w-2/3 sm:mx-4 md:mx-auto my-4 bg-gray-100 py-5 px-3 rounded shadow border border-gray">
				<h1 className="text-3xl">Personal information</h1>
				<form className="w-full my-1">
					<div className="my-3 w-full flex flex-row">
						<div className="mr-1 w-1/2">
							<label
								htmlFor="title"
								className="text-gray-400 font-xs"
							>
								Title
							</label>
							<input
								type="text"
								className="py-2 px-3 w-full border border-gray rounded "
								placeholder="Assistant professor"
								name="title"
								onChange={change('title')}
								defaultValue={values.title}
								required="true"
							/>
						</div>
						<div className="mx-1 w-1/2">
							<label
								htmlFor="phoneNumber"
								className="text-gray-400 font-xs"
							>
								Phone number
							</label>
							<input
								type="text"
								className="py-2 px-3 w-full border border-gray rounded "
								placeholder="(123)-456-7890"
								name="phone"
								onChange={change('phone')}
								defaultValue={values.phone}
								required="true"
							/>
						</div>
					</div>
					<div className="my-3 w-full">
						<label
							htmlFor="title"
							className="text-gray-400 font-xs"
						>
							Office location
						</label>
						<input
							type="text"
							className="py-2 px-3 w-full border border-gray rounded "
							placeholder="Where is your office located?"
							name="officeLocation"
							onChange={change('officeLocation')}
							defaultValue={values.officeLocation}
							required="true"
						/>
					</div>
					<div className="my-3 w-full">
						<label
							htmlFor="officeHours"
							className="text-gray-400 font-xs"
						>
							Office hours
						</label>
						<textarea
							type="text"
							className="py-2 px-3 w-full border border-gray rounded "
							placeholder="What times can students find you at your office?"
							name="officeHours"
							onChange={change('officeHours')}
							defaultValue={values.officeHours}
							required="true"
						/>
					</div>
					<div className="my-3 w-full">
						<label
							htmlFor="contactPolicy"
							className="text-gray-400 font-xs"
						>
							Contact policy
						</label>
						<textarea
							type="text"
							className="py-2 px-3 w-full border border-gray rounded "
							placeholder="What steps do students needs to take before contacting you?"
							name="contactPolicy"
							onChange={change('contactPolicy')}
							defaultValue={values.contactPolicy}
							required="true"
						/>
					</div>
					<div className="my-3 w-full">
						<label
							htmlFor="email"
							className="text-gray-400 font-xs"
						>
							Teaching background
						</label>
						<textarea
							type="text"
							className="py-2 px-3 w-full border border-gray rounded "
							placeholder="What is your teaching background in and what experiences do you bring to students?"
							name="background"
							onChange={change('background')}
							defaultValue={values.background}
							required="true"
						/>
					</div>
					<div className="my-3 w-full">
						<label
							htmlFor="philosophy"
							className="text-gray-400 font-xs"
						>
							Philosophy
						</label>
						<textarea
							type="text"
							className="py-2 px-3 w-full border border-gray rounded"
							placeholder="What philosophy do you teach by?"
							name="philosophy"
							onChange={change('philosophy')}
							defaultValue={values.philosophy}
							required="true"
						/>
					</div>
					<div className="my-3 w-full flex flex-row">
						<div className="w-1/2 mr-1">
							<label
								htmlFor="researchInterest"
								className="text-gray-400 font-xs"
							>
								Research interests
							</label>
							<input
								type="text"
								className="py-2 px-3 w-full border border-gray rounded"
								placeholder="What research topics excite you?"
								name="researchInterest"
								onChange={change('researchInterest')}
								defaultValue={values.researchInterest}
								required="true"
							/>
						</div>
						<div className="w-1/2 ml-1">
							<label
								htmlFor="website"
								className="text-gray-400 font-xs"
							>
								Personal website URL
							</label>
							<input
								type="text"
								className="py-2 px-3 w-full border border-gray rounded"
								placeholder="https://example.com"
								name="personalWebsite"
								onChange={change('personalWebsite')}
								defaultValue={values.website}
								required="true"
							/>
						</div>
					</div>
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
								Next
								<ArrowRight />
							</span>
						</button>
					</div>
				</form>
			</div>
		)
	}
}

export default PersonalInfo
