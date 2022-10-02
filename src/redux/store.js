import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { friendsReducer } from "./reducers/friendsReducer.js";
import { loginReducer } from "./reducers/loginReducer.js";
import {registerReducer} from "./reducers/registerReducer.js";
import {userReducer} from "./reducers/userReducer.js";
import {notificationsReducer} from "./reducers/notificationsReducer.js"

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    user: userReducer,
    friends: friendsReducer,
    notifications: notificationsReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));