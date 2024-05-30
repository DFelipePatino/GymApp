import axios from "axios";
import image1 from '/onegym.jpeg'
import image2 from '/titan.png'
import image3 from '/rope.jpeg'
import image4 from '/f.png'
import image5 from '/Screenshot1.png'
import image6 from '/Screenshot2.png'
import image7 from '/Screenshot3.png'
import image8 from '/Screenshot4.png'
import image9 from '/Screenshot5.png'
import image10 from '/Screenshot6.png'
import image11 from '/Screenshot7.png'


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

export const emptyState = () => {
    return (dispatch) => {
        const data = {
            category: '',
            images: [

            ]
        }
        dispatch({ type: EMPTY_STATE, payload: data });

    }
}

export const getDefault = () => {
    return (dispatch) => {
        const data = {
            category: 'Explora tu contenido aqui!',
            images: [

            ]
        }
        dispatch({ type: GET_DEFAULT, payload: data });

    }
}

export const getCardio = () => {
    return (dispatch) => {
        const data = {
            category: 'Cardio',
            images: [
                image10,
                image11,
                image6,
                image7,
            ]
        }
        dispatch({ type: GET_CARDIO, payload: data });

    }
}

export const getContacto = () => {
    return (dispatch) => {
        const data = {
            category: 'Contacto',
            images: [
                image8,
                image9,
            ],
        }
        dispatch({ type: GET_CONTACTO, payload: data });

    }
}

export const getYoga = () => {
    return (dispatch) => {
        const data = {
            category: 'Yoga',
            images: [
                image1,
                image2,
            ],
        }
        dispatch({ type: GET_YOGA, payload: data });

    }
}

export const getPilates = () => {
    return (dispatch) => {
        const data = {
            category: "Pilates",
            images: [
                image4,
                image5,
                image10,
                image11,
                image6,

            ]
        }
        dispatch({ type: GET_PILATES, payload: data });

    }
}
export const getCrossfit = () => {
    return (dispatch) => {
        const data = {
            category: "Crossfit",
            images: [
                image1,
                image2,
                image3,
                image4, ,
                image5
            ]
        }
        dispatch({ type: GET_CROSSFIT, payload: data });
    }
}

export const getBoxing = () => {
    return (dispatch) => {
        const data = {
            category: 'Kick Boxing',
            images: [
                image10,
                image11,
                image6,
                image7,
                image8,
                image9,
                image1,
                image2,
                image3,
                image4,
                image5
            ]
        }
        dispatch({ type: GET_BOXING, payload: data });

    }
}

export const getUser = (username) => {
    return (dispatch) => {
        const data = username;
        dispatch({ type: GET_USER, payload: data });

    }
}


export const setHomeContent = (content) => {
    // console.log(content, "content in action");
    return (dispatch) => {
        const data = content;
        dispatch({ type: SET_HOME_CONTENT, payload: data });
    }
}