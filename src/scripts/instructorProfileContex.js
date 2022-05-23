/**
 * @desc A React Context for the Instructor Profile to be used in the user's profile page
 * @module
 * @category Context
 * @requires React.createContext
 * @requires React.useContext
 * @requires React.useReducer
 */
import React, { createContext, useContext, useReducer } from 'react'

const InstructorProfileContext = createContext()

/**
 * @function
 * @param {InstructorProfile} state - The current state of the context
 * @param {Object} action - The action object
 * @param {string} action.type - The type of action to be performed
 * @param {string} action.payload - The payload of the action
 * @returns {InstructorProfile | Error} The new state of the context or an error if the action type is not found.
 */
function contextReducer(state, action) {
	switch (action.type) {
		case 'SET_INSTRUCTOR_PROFILE':
			return {
				...state,
				instructorProfile: action.payload,
			}
		default:
			throw new Error(`Unhandled action type: ${action.type}`)
	}
}

/**
 * @function
 * @param {React.ReactChild} children - The children components to be rendered inside of the provider
 * @returns {JSX.Element} The Provider component for the Instructor Profile Context
 */
function InstructorProvider({ children }) {
	const [state, dispatch] = useReducer(contextReducer, {
		instructorProfile: {
			id: '',
			title: '',
			officeLocation: '',
			officeHours: '',
			contactPolicy: '',
			phone: '',
			background: '',
			researchInterest: '',
			selectedPapersAndPublications: '',
			personalWebsite: '',
			philosophy: '',
		},
	})

	return (
		<InstructorProfileContext.Provider value={{ state, dispatch }}>
			{children}
		</InstructorProfileContext.Provider>
	)
}

/**
 * @function
 * @returns {InstructorProfile | Error} The current state of the context or an error if the context is not found or not within the Provider.
 */
function useInstructorContext() {
	const context = useContext(InstructorProfileContext)
	if (context === undefined) {
		throw new Error(
			'useInstructorContext must be used within a InstructorProvider'
		)
	}
	return context
}

/**
 * @desc The default state of the Instructor Profile Context
 * @typedef {Object} InstructorProfile
 * @property {string} id - The id of the instructor
 * @property {string} title - The title of the instructor
 * @property {string} officeLocation - The office location of the instructor
 * @property {string} officeHours - The office hours of the instructor
 * @property {string} contactPolicy - The contact policy of the instructor
 * @property {string} phone - The phone number of the instructor
 * @property {string} background - The background of the instructor
 * @property {string} researchInterest - The research interest of the instructor
 * @property {string} selectedPapersAndPublications - The selected papers and publications of the instructor
 * @property {string} personalWebsite - The personal website URL of the instructor
 * @property {string} philosophy - The philosophy of the instructor
 */

export { InstructorProvider, useInstructorContext }
