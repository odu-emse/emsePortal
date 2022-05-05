import React, { useState } from 'react'
import { getToken } from '../helpers'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import UserInfo from './Register/UserInfo'
import PersonalInfo from './Register/PersonalInfo'
import Confirm from './Register/Confirm'
import Success from './Register/Success'
import { checkTaken } from '../../utils/checkTaken'

const Register = (props) => {
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
	//next step
	//renders errors upon incomplete and allows progress if no errors are present
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
			setStep(step + 1)
		}
	}

	//previous step
	const previousStep = () => {
		if (group === 'student' && step === 3) {
			setStep(step - 2)
		} else {
			setStep(step - 1)
		}
	}

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
			const email = e.target.value

			let data = {
				query: `query{
                    users{
                        email
                    }
			    }`,
			}

			checkTaken(email, data)
				.then((res) => {
					if (res.message.length > 0) {
						setError(true)
						return toast.error(res.message, {
							position: toast.POSITION.TOP_RIGHT,
						})
					} else {
						setError(false)
						setEmail(res.email)
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
