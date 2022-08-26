import {currencyAPI} from "../api/api";

const SET_COURSE_USD = 'SET_COURSE_USD';
const SET_COURSE_EUR = 'SET_COURSE_EUR';

let initialState = {
    courseUSD: 39,
    courseEUR: 40,
    courseUAH: 1,
}

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COURSE_USD:
            return {...state, offset: action.course}
        case SET_COURSE_EUR:
            return {...state, offset: action.course}
        default:
            return state;
    }
}

export default courseReducer;

export const setCourseUSD = (course) => ({type: SET_COURSE_USD, course})
export const setCourseEUR = (course) => ({type: SET_COURSE_EUR, course})

export const getCourseUSD= () => {
    return (dispatch) => {
        currencyAPI.getCurrencyAPI().then(data => {
            dispatch(setCourseUSD(data))
        })
    }
}
