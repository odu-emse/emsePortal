import React from "react"
import styled from "styled-components"

const Panel = (props) => {
	const { children, size, ...rest } = props

	const classes = [
		"border-gray-200",
		"border-2",
		"rounded-lg",
		"bg-gray-100",
		"px-6",
		"py-4",
	]

	if (size === 2) {
		classes.push("w-2")
	} else if (size === 4) {
		classes.push("w-4")
	}

	return (
		<Panel className={classes.join(" ")} {...rest}>
			{children}
		</Panel>
	)
}

export default Panel
