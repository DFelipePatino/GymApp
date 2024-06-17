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
    EMPTY_STATE,
    GET_METHODS,
    CRD_ITEM_2VIEW,
    SET_METODO_ID,
    ADD_FAV,
    REMOVE_FAV
} from "./action-types";

const initialState = {
    results: {},
    resultsFiltered: {},
    user: '',
    homeContent: '',
    cardItem2View: {},
    metodoID: '',
    entrenamientoID: '',
    rutinaID: '',
    favorites: [],

}

const reducer = (state = initialState, action) => {
    switch (action.type) {


        case GET_DEFAULT:
            return {
                ...state,
                resultsFiltered: action.payload,
            }

        case EMPTY_STATE:
            return {
                ...state,
                results: action.payload,
            }

        case GET_METHODS:
            return {
                ...state,
                results: action.payload,
            }


        case CRD_ITEM_2VIEW:
            return {
                ...state,
                cardItem2View: action.payload,
            }

        case SET_METODO_ID:
            return {
                ...state,
                metodoID: action.payload,
            }

        case GET_CARDIO:
            return {
                ...state,
                resultsFiltered: action.payload,
            }

        case ADD_FAV:
            return {
                ...state,
                favorites: [action.payload, ...state.favorites],
            }

        case REMOVE_FAV:
            return {
                ...state,
                favorites: action.payload,
            }

        case GET_CONTACTO:
            return {
                ...state,
                resultsFiltered: action.payload,
            }

        case GET_YOGA:
            return {
                ...state,
                resultsFiltered: action.payload,
            }

        case GET_PILATES:
            return {
                ...state,
                resultsFiltered: action.payload,
            }

        case GET_CROSSFIT:
            return {
                ...state,
                resultsFiltered: action.payload,
            }

        case GET_BOXING:
            return {
                ...state,
                resultsFiltered: action.payload,
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