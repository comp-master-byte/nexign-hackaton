import { DELETE_FRIEND_FROM_REQUEST, GET_ALL_NOTIFICATIONS, GET_ALL_NOTIFY_FRIENDS } from "../types";

const initialState = {
    notifications: [],
    notifcationFriends: []
}

export const notificationsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_NOTIFICATIONS:
            return {...state, notifications: [...state.notifications, ...action.payload]}
        case GET_ALL_NOTIFY_FRIENDS:
            return {...state, notifcationFriends: [...state.notifcationFriends, ...action.payload]}
        case DELETE_FRIEND_FROM_REQUEST:
            return {...state, notificationsReducer: state.notifcationFriends.filter(noty => noty.id !== action.payload)}
        default:
            return state;
    }
}