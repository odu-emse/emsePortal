import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ArrowLeft, ArrowRight } from 'react-feather'

/**
 * @summary The User Info component displays the basic form fields that all users need to fill out to register.
 * @component
 * @category User
 */
const UserInfo = ({ values, change, nextStep, error }) => {
	/**
	 * @function
	 * @summary This function is called when the user clicks on the next button. This function has an event parameter to prevent the page from refreshing after a mocked submit event.
	 * @param {React.ChangeEventHandler<HTMLInputElement>} e - The event handler object for the input fields
	 */
	const next = (e) => {
		e.preventDefault()
		if (!error) {
			nextStep()
		}
	}

	return (
		<div className="lg:w-1/2 md:w-2/3 sm:mx-4 md:mx-auto my-4 bg-gray-100 py-5 px-3 rounded shadow border border-gray">
			<h1 className="text-3xl">User information</h1>
			<form className="w-full my-1" onSubmit={next}>
				<div className="my-3 w-full flex flex-row">
					<div className="mr-1 w-1/3">
						<label
							htmlFor="firstName"
							className="text-gray-400 font-xs"
						>
							First name
						</label>
						<input
							type="text"
							className="py-2 px-3 w-full border border-gray rounded "
							placeholder="First name"
							name="firstName"
							onChange={change('firstName')}
							defaultValue={values.firstName}
							required={true}
						/>
					</div>
					<div className="mx-1 w-1/3">
						<label
							htmlFor="middleName"
							className="text-gray-400 font-xs"
						>
							Middle name
						</label>
						<input
							type="text"
							className="py-2 px-3 w-full border border-gray rounded "
							placeholder="Middle name"
							name="middleName"
							onChange={change('middleName')}
							defaultValue={values.middleName}
						/>
					</div>
					<div className="ml-1 w-1/3">
						<label
							htmlFor="lastName"
							className="text-gray-400 font-xs"
						>
							Last name
						</label>
						<input
							type="text"
							className="py-2 px-3 w-full border border-gray rounded "
							placeholder="Last name"
							name="lastName"
							onChange={change('lastName')}
							defaultValue={values.lastName}
							required={true}
						/>
					</div>
				</div>
				<div className="my-3 w-full">
					<label htmlFor="email" className="text-gray-400 font-xs">
						ODU affiliated email
					</label>
					<input
						type="email"
						className={`py-2 px-3 w-full border border-gray rounded ${
							error?.field &&
							error.field === 'email' &&
							'border-red-500'
						}`}
						placeholder="example@odu.edu"
						name="email"
						onChange={change('email')}
						defaultValue={values.email}
						required={true}
						autoComplete="off"
					/>
				</div>
				<div className="my-3 w-full flex flex-row">
					<div className="w-1/2 mr-1">
						<label
							htmlFor="password"
							className="text-gray-400 font-xs"
						>
							Password
						</label>
						<input
							type="password"
							className={`py-2 px-3 w-full border border-gray rounded ${
								error?.field &&
								error.field === 'password' &&
								'border-red-500'
							}`}
							placeholder="Password"
							name="password"
							onChange={change('password')}
							defaultValue={values.password}
							required={true}
						/>
					</div>
					<div className="w-1/2 ml-1">
						<label
							htmlFor="password"
							className="text-gray-400 font-xs"
						>
							Password confirmation
						</label>
						<input
							type="password"
							className={`py-2 px-3 w-full border border-gray rounded ${
								error?.field &&
								error.field === 'password' &&
								'border-red-500'
							}`}
							placeholder="Password confirmation"
							name="passwordConf"
							onChange={change('passwordConf')}
							defaultValue={values.passwordConf}
							required={true}
						/>
					</div>
				</div>
				<div className="flex flex-row w-1/2 mx-auto px-3 my-3 items-center">
					<input
						type="radio"
						required={true}
						name="group"
						className="mx-2"
						defaultChecked={values.group === 'student' && true}
						value="student"
						onChange={change('group')}
					/>
					<label className="my-0" htmlFor="input">
						Student
					</label>
					<input
						type="radio"
						required={true}
						name="group"
						className="mx-2"
						defaultChecked={values.group === 'assistant' && true}
						value="assistant"
						onChange={change('group')}
					/>
					<label className="my-0" htmlFor="input">
						Adjunct
					</label>
					<input
						type="radio"
						required={true}
						name="group"
						className="mx-2"
						defaultChecked={values.group === 'instructor' && true}
						value="instructor"
						onChange={change('group')}
					/>
					<label className="my-0" htmlFor="input">
						Professor
					</label>
				</div>
				<div className="w-full flex flex-row justify-between">
					<button
						className="text-gray-700 rounded py-2 px-4 bg-gray-300 bg-opacity-75 w-1/3 block cursor-not-allowed"
						type="reset"
						disabled={true}
					>
						<span className="flex flex-row items-center justify-center">
							<ArrowLeft /> Back
						</span>
					</button>
					<button
						className={`rounded py-2 px-4 w-1/3 block transition-all ${
							error === true
								? 'bg-gray-300 bg-opacity-75 text-gray-700 cursor-not-allowed'
								: 'text-white bg-blue-400 hover:bg-blue-700'
						}`}
						type="submit"
					>
						<span className="flex flex-row items-center justify-center">
							Next
							<ArrowRight />
						</span>
					</button>
				</div>
				<div className="w-full text-center">
					<div className="mt-4 block font-sm text-gray-800 font-weight-light">
						Already have an account?{' '}
						<Link to="/users/login">
							<span className="hover:underline hover:text-gray-800 text-blue-800 font-bold">
								Log in
							</span>
						</Link>
					</div>
				</div>
			</form>
		</div>
	)
}

export default UserInfo

UserInfo.propTypes = {
	/**
	 * The form field values passed down from the Register component
	 * */
	values: PropTypes.object.isRequired,
	/**
	 * The change function to handle the input changes in the form and update the state in the parent component
	 * */
	change: PropTypes.func.isRequired,
	/**
	 * The next step function to handle progressing further in the form
	 * */
	nextStep: PropTypes.func.isRequired,
	/**
	 * The error state of the form to be shared across sibling components and interpreted by the parent component
	 * */
	error: PropTypes.object.isRequired,
}
