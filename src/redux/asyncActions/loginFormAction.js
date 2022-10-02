import axios from 'axios'
import { loggedToSystem, submitLoginForm } from '../actionCreators'

export const loginFormAction = (loginData) => {
    return dispatch => {
        axios.post(`http://localhost:8080/login?username=${loginData.login}&password=${loginData.password}`, {})
            .then(response => {
                localStorage.setItem('userId', response.data);
                dispatch(submitLoginForm(response.headers))
                dispatch(loggedToSystem(true));
                setTimeout(() => dispatch(loggedToSystem(false)), 100);
            })
            .catch(error => console.log(error))
    }
}