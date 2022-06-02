/**
 * @name GetPlanByStudentID
 * @module
 * @category Hooks
 * @requires axios
 */
import axios from 'axios'

/**
 * @name getPlan
 * @summary Asynchronous helper function (fetch hook) for fetching the user's plan of study based on the user's ID
 * @function
 * @async
 * @param {string} studentID The user's ID that the query is executed against
 * @returns {Object} The user's plan of study or an axios Error object
 * @example
 *
 * getPlan(param)
 *		.then((response) => {
 *			try {
 *				... // Update the component state with the response
 *				... // Set the loading state to false
 *			} catch (error) {
 *				... // Handle the error if the response is not valid
 *			}
 *		})
 *		.catch((err) => {
 *			... // Handle the error if the fetch request fails
 *		})
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
