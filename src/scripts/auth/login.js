import axios from 'axios'

/**
 * Given a valid google code, returns a accessToken and an refresh token.
 * @param {String} code 
 * @returns 
 */
export default async function login(code) {
    const payload = {
        query: `{
            login(code: ${code}) {
                accessToken,
                refreshToken
            }
        }`
    }

    return await axios.post(`${process.env.REACT_APP_API}/graphql`, payload);
}