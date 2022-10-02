import axios from "axios";
import { getAllFriends } from "../actionCreators";

export const getAllFriendsAction = (userId) => {
    return dispatch => {
        axios.get(`http://localhost:8080/api/users/friends/${userId}`)
            .then(response => dispatch(getAllFriends(response.data)))
            .catch(error => console.log(error))
    }
}