import axios from 'axios';
import { submitRegisterForm } from '../actionCreators';

export const registerFormAction = (registerData) => {
    return dispatch => {
        axios.post('http://5.252.21.123:8080/register', registerData)
            .then(() => dispatch(submitRegisterForm(registerData)))
            .catch(error => console.log(error))
    }
}