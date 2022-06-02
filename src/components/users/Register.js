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
	 * @member
	 * @name RegisterComponentState
	 * @memberof Register
	 * @type {React.ComponentState}
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
	const [step, setStep] = useState(1)
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [middleName, setMiddleName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConf, setPasswordConf] = useState('')
	const [group, setGroup] = useState(null)
	const [title, setTitle] = useState('')
	const [officeLocation, setOfficeLocation] = useState('')
	const [officeHours, setOfficeHours] = useState('')
	const [phone, setPhone] = useState('')
	const [contactPolicy, setContactPolicy] = useState('')
	const [background, setBackground] = useState('')
	const [researchInterest, setResearchInterest] = useState('')
	const [selectedPapersAndPublications, setSelectedPapersAndPublications] =
		useState('')
	const [website, setWebsite] = useState('')
	const [philosophy, setPhilosophy] = useState('')
	const [error, setError] = useState(false)

	/**
	 * @function
	 * @summary A simple increment function to move between Registration steps.
	 * @description The next step function is called when the next button is clicked on the registration form. It performs multiple validation checks. It renders an errors upon incomplete fields and allows progress if no errors are present. If no validation errors are present, the step is incremented and the field values are saved in the component state.
	 * @memberof Register
	 * @see {@link checkTaken}
	 */
	const nextStep = () => {
		if (
			firstName.length === 0 ||
			lastName.length === 0 ||
			email.length === 0 ||
			group == null
		) {
			setStep(1)
			toast.error(
				'Please make sure that the required fields are filled out',
				{
					position: toast.POSITION.TOP_RIGHT,
				}
			)
			setError(true)
		} else if (password.length <= 6 || passwordConf.length <= 6) {
			setStep(1)
			toast.error(
				'Please make sure that your password is at least 6 characters long',
				{
					position: toast.POSITION.TOP_RIGHT,
				}
			)
			setError(true)
		} else if (password !== passwordConf) {
			setStep(1)
			toast.error('Please make sure that your password match', {
				position: toast.POSITION.TOP_RIGHT,
			})
			setError(true)
		} else {
			checkTaken(email)
				.then((res) => {
					if (res.message.length > 0) {
						setError(true)
						return toast.error(res.message, {
							position: toast.POSITION.TOP_RIGHT,
						})
					} else {
						setError(false)
						setEmail(res.email)
						setStep(step + 1)
					}
				})
				.catch((err) => {
					setError(true)
					console.error(err)
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
		if (group === 'student' && step === 3) {
			setStep(step - 2)
		} else {
			setStep(step - 1)
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
		if (error && input) {
			setError(false)
		}
		if (input === 'firstName') {
			setFirstName(e.target.value)
		}
		if (input === 'lastName') {
			setLastName(e.target.value)
		}
		if (input === 'middleName') {
			setMiddleName(e.target.value)
		}
		if (input === 'email') {
			setEmail(e.target.value)
		}
		if (input === 'password') {
			setPassword(e.target.value)
		}
		if (input === 'passwordConf') {
			setPasswordConf(e.target.value)
		}
		if (input === 'group') {
			setGroup(e.target.value)
		}
		if (input === 'title') {
			setTitle(e.target.value)
		}
		if (input === 'officeLocation') {
			setOfficeLocation(e.target.value)
		}
		if (input === 'officeHours') {
			setOfficeHours(e.target.value)
		}
		if (input === 'phone') {
			setPhone(e.target.value)
		}
		if (input === 'contactPolicy') {
			setContactPolicy(e.target.value)
		}
		if (input === 'background') {
			setBackground(e.target.value)
		}
		if (input === 'researchInterest') {
			setResearchInterest(e.target.value)
		}
		if (input === 'selectedPapersAndPublications') {
			setSelectedPapersAndPublications(e.target.value)
		}
		if (input === 'personalWebsite') {
			setWebsite(e.target.value)
		}
		if (input === 'philosophy') {
			setPhilosophy(e.target.value)
		}
	}
	//combining all form values into a single object
	const values = {
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
		phone,
		contactPolicy,
		background,
		researchInterest,
		selectedPapersAndPublications,
		website,
		philosophy,
	}
	if (getToken() !== `Bearer ${null}`) {
		//if there is a token -> send them home
		return props.history.push('/')
	} else {
		switch (step) {
			case 1:
				return (
					<>
						<ToastContainer />
						<UserInfo
							nextStep={nextStep}
							change={change}
							values={values}
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
							values={values}
							error={error}
						/>
					</>
				)
			case 3:
				return (
					<Confirm
						nextStep={nextStep}
						previousStep={previousStep}
						values={values}
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
