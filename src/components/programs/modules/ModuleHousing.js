import React, { useEffect, useState } from "react"
import axios from "axios"
import { Container } from "@material-ui/core"
import { Loader } from "react-feather"

export default function ModuleHousing(props) {
	const initialUserState = {
		module: {},
		loading: true,
	}

	const {
		match: { params },
	} = props

	const [module, setUser] = useState(initialUserState)

	useEffect(() => {
		const getUser = async () => {
			let config = {
				headers: {
					"Content-Type": "application/json",
				},
			}
			const { data } = await axios(
				`${process.env.REACT_APP_API}/api/modules/${params.moduleId}`,
				config
			)

			setUser(data)
		}

		getUser()
	}, [])
	return module.loading ? (
		<Container className="mx-auto w-100 d-flex justify-content-center align-items-center">
			<Loader className="spin" size="42pt" />
		</Container>
	) : (
		<div className="container">
			<h1>{module.data._id}</h1>
		</div>
	)
}
