/**
 * @name Register
 * @category Authentication
 * @class
 * @summary Register page that holds all the steps involved in the registration flow
 * @param {React.ComponentProps} props The Component props passed down from the parent ({@link App}).
 * @requires React.useState
 * @requires react-toastify
 * @requires getToken
 */
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Confirm from './Register/Confirm'
import PersonalInfo from './Register/PersonalInfo'
import Success from './Register/Success'
import UserInfo from './Register/UserInfo'
import { checkTaken } from '../../utils/checkTaken'
import { getToken } from '../helpers'

const Register = (props) => {
	/**
	 * @typedef UserRegister
	 * @memberof Register
	 * @property {String} firstName
	 * @property {String} lastName
	 * @property {String} middleName
	 * @property {String} email The email address of the user.
	 * @property {String} password
	 * @property {String} passwordConf
	 * @property {String} group
	 */

	/**
	 * @typedef InstructorRegister
	 * @memberof Register
	 * @property {String} [title]
	 * @property {String} [officeHours]
	 * @property {String} [officeLocation]
	 * @property {String} [phone]
	 * @property {String} [contactPolicy]
	 * @property {String} [background]
	 * @property {String} [researchInterests]
	 * @property {String} [selectedPapersAndPublications]
	 * @property {String} [website]
	 * @property {String} [philosophy]
	 */

	/**
	 * @callback setUser
	 * @memberof Register
	 * @param {UserRegister} values
	 */
	/**
	 * @callback setInstructorProfile
	 * @memberof Register
	 * @param {InstructorRegister} values
	 */

	/**
	 * @typedef State
	 * @memberof Register
	 * @prop {UserRegister} [user]
	 * @prop {setUser} setUser
	 */

	/**
	 * @typedef State
	 * @memberof Register
	 * @prop {InstructorRegister} [instructor]
	 * @prop {setInstructorProfile} setInstructorProfile
	 */

	/**
	 * @property {Number} step The current step in the registration flow
	 * @property {String} firstName
	 * @property {String} lastName
	 * @property {String} middleName
	 * @property {String} email The email address of the user.
	 * @property {String} password
	 * @property {String} passwordConf
	 * @property {String | null} group
	 * @property {String} [title]
	 * @property {String} [officeHours]
	 * @property {String} [officeLocation]
	 * @property {String} [phone]
	 * @property {String} [contactPolicy]
	 * @property {String} [background]
	 * @property {String} [researchInterests]
	 * @property {String} [selectedPapersAndPublications]
	 * @property {String} [website]
	 * @property {String} [philosophy]
	 * @property {Boolean} error
	 */
	/**
	 * @type {State}
	 */
	const [step, setStep] = useState(1)
	const [user, setUser] = useState({})
	const [error, setError] = useState(null)

	/**
	 * @function
	 * @summary A simple increment function to move between Registration steps.
	 * @description The next step function is called when the next button is clicked on the registration form. It performs multiple validation checks. It renders an errors upon incomplete fields and allows progress if no errors are present. If no validation errors are present, the step is incremented and the field values are saved in the component state.
	 * @memberof Register
	 * @see {@link checkTaken}
	 */
	const nextStep = () => {
		if (validateForm()) {
			checkTaken(user.email)
				.then((res) => {
					if (res.message.length > 0) {
						setError({
							cause: 'Error while checking email address',
							field: 'email',
						})
						return toast.error(res.message, {
							position: toast.POSITION.TOP_RIGHT,
						})
					} else {
						setError(null)
						setUser({ ...user, email: res.email })
						setStep(step + 1)
					}
				})
				.catch((err) => {
					setError({
						cause: 'Email address is already in use.',
						field: 'email',
					})
					return toast.error(err, {
						position: toast.POSITION.TOP_RIGHT,
					})
				})
		}
	}

	/**
	 * @name previousStep
	 * @function
	 * @summary A simple decrement function to move between Registration steps.
	 * @description The previous step function is called when the back button is clicked on the registration form. It does not perform any validations, it simply decrements the step. If the user selected to be a student, the backwards step is set to 2, as the student does not have to fill out the professor information fields, present in step 2. If the user selected to be a professor, the backwards step is set to 1.
	 * @memberof Register
	 */
	const previousStep = () => {
		if (user.group === 'student' && step === 3) {
			setStep(step - 2)
		} else {
			setStep(step - 1)
		}
	}

	const validateForm = () => {
		if (user.password !== user.passwordConf) {
			setError({
				field: 'password',
				message: 'Passwords do not match.',
			})
			return false
		}
		if (user.password.length <= 6 || user.passwordConf.length <= 6) {
			setError({
				field: 'password',
				message: 'Passwords are not long enough.',
			})
			return false
		} else {
			return true
		}
	}

	/**
	 * @name change
	 * @function
	 * @summary This function handles all the changes made in the registration form fields.
	 * @todo Turn the update state function into a dynamic key value pair implementation with the spread operator.
	 * @memberof Register
	 */
	const change = (input) => (e) => {
		if (error) {
			setError(null)
		}
		setUser({ ...user, [input]: e.target.value })
	}
	if (getToken() !== `Bearer ${null}`) {
		//if there is a token -> send them home
		props.history.push('/portal')
	} else {
		switch (step) {
			case 1:
				return (
					<>
						<ToastContainer />
						<UserInfo
							nextStep={nextStep}
							change={change}
							values={user}
							error={error}
						/>
					</>
				)
			case 2:
				return (
					<>
						<ToastContainer />
						<PersonalInfo
							nextStep={nextStep}
							previousStep={previousStep}
							change={change}
							values={user}
							error={error}
						/>
					</>
				)
			case 3:
				return (
					<Confirm
						nextStep={nextStep}
						previousStep={previousStep}
						values={user}
						error={error}
					/>
				)
			case 4:
				return <Success />
			default:
				return null
		}
	}
}

export default Register
