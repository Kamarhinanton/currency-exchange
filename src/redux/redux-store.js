import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import courseReducer from "./course-reducer";
import thunkMiddleware from "redux-thunk";


let reducers = combineReducers({
    courseContent: courseReducer
});

let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store;

export default store;