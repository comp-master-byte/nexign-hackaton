import { GET_ALL_FRIENDS } from "../types"

const initialState = {
    friends: []
}

export const friendsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_FRIENDS:
            return {...state, friends: [...state.friends, ...action.payload]}
        default: 
            return state
    }
}