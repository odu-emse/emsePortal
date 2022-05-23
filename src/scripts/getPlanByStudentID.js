import axios from 'axios'

/**
 * @summary Asynchronous helper function (fetch hook) for fetching the user's plan of study based on the user's ID
 * @module
 * @function
 * @category Hooks
 * @async
 * @param {string} studentID The user's ID that the query is executed against
 * @returns {Object} The user's plan of study or an axios Error object
 * @requires axios
 */
export default async function getPlan(studentID) {
	const payload = {
		// language=GraphQL
		query: `{
					planByID(id: "${studentID}"){
						id,
						student{
							id,
							email,
							firstName,
							lastName,
							dob
						},
						modules{
							id,
							enrolledAt,
							role,
							module{
								id,
								moduleName,
								moduleNumber
							},
						},
						courses{
							id,
							enrolledAt,
							course{
								name,
							}
						},
						assignmentResults{
							id,
							assignment{
								id,
								name,
								dueAt,
							},
							gradedBy{
								id,
								email,
								firstName,
								lastName
							},
							result,
							submittedAt
						}
					}
				}`,
	}
	return await axios
		.post(`${process.env.REACT_APP_API}/graphql`, payload)
		.then((document) => {
			return document.data.data.planByID
		})
		.catch((err) => {
			console.error(err)
		})
}
