import {appReducer} from "./app-reducer";
import {authReducer} from "./auth-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import {packReducer} from "./pack-reducer";
import {cardReducer} from "./card-reducer";

let rootReducer = combineReducers({
    app:appReducer,
    auth:authReducer,
    packs:packReducer,
    cards:cardReducer
})

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))