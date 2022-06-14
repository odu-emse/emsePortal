import PropTypes from 'prop-types'
import React from 'react'

/**
 * @component
 * @category Program
 * @summary The Assignments component that is used to render the assignments page.
 * @returns {JSX.Element}
 */
const Assignments = (props) => {
	console.log(props)
	return (
		<section className="flex w-full px-10">
			<h1 className="text-3xl">Assignments</h1>
		</section>
	)
}

export default Assignments

Assignments.propTypes = {
	/**
	 * Basic props that are passed down to this component from the parent.
	 */
	props: PropTypes.shape({
		history: PropTypes.object,
		location: PropTypes.object,
		match: PropTypes.object,
	}),
}
