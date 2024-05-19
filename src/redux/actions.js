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
    GET_PESAS,
    GET_PILATES,
    GET_CROSSFIT,
    GET_BOXING,
    GET_USER
} from "./action-types";

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

export const getPesas = () => {
    return (dispatch) => {
        const data = {
            category: 'Pesas',
            images: [
                image8,
                image9,
            ],
        }
        dispatch({ type: GET_PESAS, payload: data });

    }
}

export const getPilates = () => {
    return (dispatch) => {
        const data = {
            category: "Pilates",
            images: [
                image1,
                image2,
                image3,
                image4,
                image5,

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