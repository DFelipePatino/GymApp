import axios from "axios";
import image1 from '../../public/onegym.jpeg'
import image2 from '../../public/titan.png'
import image3 from '../../public/rope.jpeg'
import image4 from '../../public/f.png'
import image5 from '../../public/Screenshot1.png'
import image6 from '../../public/Screenshot2.png'
import image7 from '../../public/Screenshot3.png'
import image8 from '../../public/Screenshot4.png'
import image9 from '../../public/Screenshot5.png'
import image10 from '../../public/Screenshot6.png'
import image11 from '../../public/Screenshot7.png'


import {
    GET_CARDIO,
    GET_PESAS,
    GET_PILATES,
    GET_CROSSFIT
} from "./action-types";

export const getCardio = () => {
    return (dispatch) => {
        const data = [
            image10,
            image11,
            image6,
            image7,
        ]
        dispatch({ type: GET_CARDIO, payload: data });

    }
}

export const getPesas = () => {
    return (dispatch) => {
        const data = [
            image8,
            image9,
        ];
        dispatch({ type: GET_PESAS, payload: data });

    }
}

export const getPilates = () => {
    return (dispatch) => {
        const data = [
            image1,
            image2,
            image3,
            image4,
            image5,

        ]
        dispatch({ type: GET_PILATES, payload: data });

    }
}
export const getCrossfit = () => {
    return (dispatch) => {
        const data = [
            image1,
            image2,
            image3,
            image4, ,
            image5
        ];
        dispatch({ type: GET_CROSSFIT, payload: data });
    }
}