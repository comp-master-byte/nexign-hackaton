import axios from "axios";
import { getUserData } from "../actionCreators";

export const getUserDataAction = (userId) => {
    return dispatch => {
        axios.get(`http://5.252.21.123:8080/api/users/${userId}`)
            .then(response => dispatch(getUserData(response.data)))
            .catch(error => console.log(error))
    }
}