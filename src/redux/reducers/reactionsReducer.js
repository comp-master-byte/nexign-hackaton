import { SEND_REACTION } from "../types"

const initialState = {
    reaction: {}
}

export const reactionsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SEND_REACTION:
            return {...state, reaction: action.payload}
            
        default:
            return state
    }
}