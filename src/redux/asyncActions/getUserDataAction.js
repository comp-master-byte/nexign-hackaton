import axios from "axios";
import { getUserData } from "../actionCreators";

export const getUserDataAction = (userId) => {
    return dispatch => {
        axios.get(`http://localhost:8080/api/users/${userId}`)
            .then(response => dispatch(getUserData(response.data)))
            .catch(error => console.log(error))
    }
}