import { Redirect } from 'react-router-dom'
import { checkForToken, getToken, removeToken } from '../helpers'

const Logout = (props) => {
	if (checkForToken()) {
		removeToken()
		return <Redirect to="/users/login" />
	} else {
		return <Redirect to={props.location} />
	}
}

export default Logout
