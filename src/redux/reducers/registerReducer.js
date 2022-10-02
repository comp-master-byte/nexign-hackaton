import { REGISTER_TO_SYSTEM } from "../types";

const initialState = {
    registerData: {}
}

export const registerReducer = (state = initialState, action) => {
    switch(action.type) {
        case REGISTER_TO_SYSTEM:
            return {...state, registerData: action.payload}

        default:
            return state;
    }
}