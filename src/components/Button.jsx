import React from "react"
import styled from "styled-components"

const Button = (props) => {
	const { children, variant, ...rest } = props

	const classes = [
		"border-blue-700",
		"border-2",
		"rounded-lg",
		"px-6",
		"py-4",
	]

	if (variant === "primary") {
		classes.push("text-white", "bg-blue-700")
	} else if (variant === "secondary") {
		classes.push("text-blue-700", "bg-white")
	}

	return (
		<Button className={classes.join(" ")} {...rest}>
			{children}
		</Button>
	)
}

export default Button
