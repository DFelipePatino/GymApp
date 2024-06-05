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
    EMPTY_STATE,
    GET_METHODS,
    CRD_ITEM_2VIEW,
    SET_METODO_ID
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
        const data =
        {
            id: 1,
            // nombre: 'Explora tu contenido aqui!',
            nombre: '',
        }

        dispatch({ type: GET_DEFAULT, payload: data });

    }
}

export const getCrdItem2View = (dia) => {
    return async (dispatch, getState) => {
        try {
            const { resultsFiltered } = getState();

            // Check if entrenamientos and the dia property exist before trying to access rutinas
            if (resultsFiltered.entrenamientos && resultsFiltered.entrenamientos[dia]) {
                const data = resultsFiltered.entrenamientos[dia].rutinas;
                // console.log(data, "data 0 in action");

                dispatch({ type: CRD_ITEM_2VIEW, payload: data });
            } else {
                console.log("entrenamientos or dia property not found");
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export const setMetodoID = (metodoIndex) => {
    return (dispatch) => {
        const data = metodoIndex;

        dispatch({ type: SET_METODO_ID, payload: data });

    }
}

const URL = "http://213.218.240.192:8082/onegym-back/api/metodos"

export const getMethods = () => {
    return async (dispatch) => {
        try {
            const data = await axios.get(URL);
            dispatch({ type: GET_METHODS, payload: data });
            // console.log(data, "data in action");
        } catch (error) {
            console.error(error);
        }
    }
}

export const getMetodo1 = (index) => {
    return async (dispatch, getState) => {
        try {
            const { results } = getState();

            const data = results.data[index];
            // console.log(data, index, "results.data  in action");

            dispatch({ type: GET_CARDIO, payload: data });
        } catch (error) {
            console.error(error);
        }
    }
}

export const getMetodo2 = () => {
    return async (dispatch, getState) => {
        try {
            const { results } = getState();

            const data = results.data[1];
            // console.log(data, "data 1 in action");

            dispatch({ type: GET_CARDIO, payload: data });
        } catch (error) {
            console.error(error);
        }
    }
}

export const getMetodo3 = () => {
    return async (dispatch, getState) => {
        try {
            const { results } = getState();

            const data = results.data[2];
            // console.log(data, "data 2 in action");

            dispatch({ type: GET_CARDIO, payload: data });
        } catch (error) {
            console.error(error);
        }
    }
}

export const getMetodo4 = () => {
    return async (dispatch, getState) => {
        try {
            const { results } = getState();

            const data = results.data[3];
            // console.log(data, "data 3 in action");

            dispatch({ type: GET_CARDIO, payload: data });
        } catch (error) {
            console.error(error);
        }
    }
}

export const getMetodo5 = () => {
    return async (dispatch, getState) => {
        try {
            const { results } = getState();

            const data = results.data[4];
            // console.log(data, "data 4 in action");

            dispatch({ type: GET_CARDIO, payload: data });
        } catch (error) {
            console.error(error);
        }
    }
}

export const getMetodo6 = () => {
    return async (dispatch, getState) => {
        try {
            const { results } = getState();

            const data = results.data[5];
            // console.log(data, "data 5 in action");

            dispatch({ type: GET_CARDIO, payload: data });
        } catch (error) {
            console.error(error);
        }
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