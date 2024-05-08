import {
    GET_CARDIO,
    GET_PESAS,
    GET_PILATES,
    GET_CROSSFIT
} from "./action-types";
const initialState = {
    results: [],

}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_CARDIO:
            return {
                ...state,
                results: action.payload,
            }

        case GET_PESAS:
            return {
                ...state,
                results: action.payload,
            }

        case GET_PILATES:
            return {
                ...state,
                results: action.payload,
            }

        case GET_CROSSFIT:
            return {
                ...state,
                results: action.payload,
            }

        default:
            return { ...state }


    }

}

export default reducer;