import { ENTER_TO_SYSTEM, REGISTER_TO_SYSTEM, LOGGED_TO_SYSTEM, GET_USER_DATA, GET_ALL_FRIENDS, SEND_REACTION, GET_ALL_NOTIFICATIONS, GET_ALL_NOTIFY_FRIENDS, DELETE_FRIEND_FROM_REQUEST } from "./types";

export const submitLoginForm = (payload) => ({type: ENTER_TO_SYSTEM, payload});
export const submitRegisterForm = (payload) => ({type: REGISTER_TO_SYSTEM, payload});
export const loggedToSystem = (payload) => ({type: LOGGED_TO_SYSTEM, payload});
export const getUserData = (payload) => ({type: GET_USER_DATA, payload});
export const getAllFriends = (payload) => ({type: GET_ALL_FRIENDS, payload});
export const sendReaction = (payload) => ({type: SEND_REACTION, payload});
export const getAllNotifications = (payload) => ({type: GET_ALL_NOTIFICATIONS, payload});
export const getAllNotifyFriends = (payload) => ({type: GET_ALL_NOTIFY_FRIENDS, payload});
export const deleteFriendRequest = (payload) => ( console.log("payload", payload), {type: DELETE_FRIEND_FROM_REQUEST, payload});