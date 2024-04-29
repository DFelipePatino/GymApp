import {
    GET_CARDIO,
    GET_PESAS,
    GET_PILATES
} from "./action-types";
import axios from "axios";

export const getCardio = () => {
    return (dispatch) => {
        const data = [
            'Correr',
            'Caminar',
            'Saltar la cuerda',
            'Escaladora',
            'Bicicleta',
            'Natación',
        ]
        dispatch({ type: GET_CARDIO, payload: data });

    }
}

export const getPesas = () => {
    return (dispatch) => {
        const data = [
            'Press de banca',
            'Sentadillas',
            'Peso muerto',
            'Dominadas',
            'Press militar',
            'Remo con barra',
            'Curl de bíceps',
            'Tríceps en polea',
            'Elevaciones laterales',
            'Press de hombros',
            'Prensa de piernas',
            'Zancadas',
            'Peso muerto rumano',
            'Peso muerto sumo',
            'Press de banca inclinado',
            'Press de banca declinado',
            'Fondos en paralelas',
            'Curl de piernas',
            'Elevaciones frontales',
            'Pájaros',
            'Patada de tríceps',
            'Encogimientos de hombros',
            'Martillo de bíceps',
            'Extensión de tríceps',
        ];
        dispatch({ type: GET_PESAS, payload: data });

    }
}

export const getPilates = () => {
    return (dispatch) => {
        const data = [
            'Mat Pilates',
            'Reformer',
            'Cadillac',
            'Barrel',
            'Tower',
            'Spine Corrector',
            'Magic Circle',
            'Wunda Chair',
            'Pedi-Pole',
            'Small Barrel',
            'Arc Barrel',
            'Ladder Barrel',
            'Chair',
        ]
        dispatch({ type: GET_PILATES, payload: data });

    }
}