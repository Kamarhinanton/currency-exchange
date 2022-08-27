import {currencyAPI} from '../api/api';

const SET_COURSE = 'SET_COURSE';

let initialState = {
    courseUSD: 39,
    courseEUR: 40,
    course:
    [
        {r030: 840, txt: 'Долар США', rate: 39, cc: 'USD', exchangedate: '29.08.2022'},
        {r030: 978, txt: 'Євро', rate: 40, cc: 'EUR', exchangedate: '29.08.2022'}
    ]
}

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COURSE:
            return {...state, course: action.course}
        default:
            return state;
    }
}

export default courseReducer;

export const setCourse = (course) => ({type: SET_COURSE, course})

export const getCourse= () => {
    return (dispatch) => {
        currencyAPI.getCurrencyAPI().then(data => {
            dispatch(setCourse(data))
        })
    }
}

