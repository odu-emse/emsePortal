import { createContext, useContext, useReducer } from 'react'

const InstructorProfileContext = createContext()

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

function useInstructorContext() {
	const context = useContext(InstructorProfileContext)
	if (context === undefined) {
		throw new Error(
			'useInstructorContext must be used within a InstructorProvider'
		)
	}
	return context
}

export { InstructorProvider, useInstructorContext }
