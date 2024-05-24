import {
    GET_CARDIO,
    GET_CONTACTO,
    GET_PILATES,
    GET_CROSSFIT,
    GET_BOXING,
    GET_YOGA,
    GET_USER,
    SET_HOME_CONTENT,
    GET_DEFAULT,
    EMPTY_STATE
} from "./action-types";
const initialState = {
    results: {},
    user: '',
    homeContent: ''

}

const reducer = (state = initialState, action) => {
    switch (action.type) {


        case GET_DEFAULT:
            return {
                ...state,
                results: action.payload,
            }

        case EMPTY_STATE:
            return {
                ...state,
                results: null
            }

        case GET_CARDIO:
            return {
                ...state,
                results: action.payload,
            }

        case GET_CONTACTO:
            return {
                ...state,
                results: action.payload,
            }

        case GET_YOGA:
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

        case GET_BOXING:
            return {
                ...state,
                results: action.payload,
            }

        case GET_USER:
            return {
                ...state,
                user: action.payload,
            }

        case SET_HOME_CONTENT:
            return {
                ...state,
                homeContent: action.payload,
            }

        default:
            return { ...state }


    }

}

export default reducer;