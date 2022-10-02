import { ENTER_TO_SYSTEM, LOGGED_TO_SYSTEM } from "../types";
import cookies from 'js-cookie';

const initialState = {
    loginForm: {},
    isLogged: false
}

export const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case ENTER_TO_SYSTEM:
            return {...state, 
                loginForm: cookies.set('JSESSIONID', action.payload.token)
            }
        case LOGGED_TO_SYSTEM:
            return {...state, isLogged: action.payload}
        default:
            return state;
    }
}