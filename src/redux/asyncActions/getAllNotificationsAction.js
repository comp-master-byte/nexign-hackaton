import axios from 'axios';
import { getAllNotifications, getAllNotifyFriends } from '../actionCreators';

export const getAllNotificationsAction = (userId) => {
    return dispatch => {
        axios.get(`http://localhost:8080/api/notifications?userId=${userId}`)
            .then(response => dispatch(getAllNotifications(response.data)))
            .catch(error => console.log(error))
    }
}

export const getAllNotifyFriendsAction = (userId) => {
    return dispatch => {
        axios.get(`http://localhost:8080/api/notifications/friend-requests?userId=${userId}`)
            .then(response => dispatch(getAllNotifyFriends(response.data)))
            .catch(error => console.log(error))
    }
}