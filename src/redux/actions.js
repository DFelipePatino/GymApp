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
    GET_METODO,
    GET_CARDIO,
    GET_ESTIRAMIENTOS,
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
    REMOVE_FAV,
    SELECTED_ENTRENAMIENTO,
    GET_BANNER,
    GET_CATEGORIES,
    GET_GOOGLE,
    GET_PROGRESO_ACTUAL,
    GET_ULTIMOS_PROGRESOS_ENTRENAMIENTO
} from "./action-types";



// export const getBanner = () => {
//     return async (dispatch) => {
//         // const data = await axios.get("http://213.218.240.192:8082/onegym-back/api/banner");
//         const data = await axios.get("http://localhost:8082/onegym-back/api/banner");
//         dispatch({ type: GET_BANNER, payload: data });
//     }
// }

// const baseUrl = "http://localhost:8082/onegym-back/api";

export const baseUrl = "https://backdev.onetrainingteam.com/onegym-backtest/api";

export const getGoogle = async () => {
    const id_token = localStorage.getItem('id_token');
    const response = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + id_token
        },
        body: null
    });

    const data = await response.json();
    return data;
};

export const getBanner = () => {
    return async (dispatch) => {
        const id_token = localStorage.getItem('id_token');
        const registro = await fetch(`${baseUrl}/banner`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + id_token
            },
            body: null
        });

        const data = await registro.json();
        dispatch({ type: GET_BANNER, payload: data });
    }
}

export const getCardio = () => {
    return async (dispatch) => {
        try {
            console.log('enters the cardio try');
            
            const id_token = localStorage.getItem('id_token');
            const registro = await fetch(`${baseUrl}/cardio`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + id_token
                }
            });

            const data = await registro.json();
            dispatch({ type: GET_CARDIO, payload: data });
        } catch (error) {
            console.log(error, 'error');
                   
            if (error) {
                console.log('Error 401');
                localStorage.clear();
            }
            console.error(error);
        }
    }
}

export const getEstiramientos = () => {
    return async (dispatch) => {
        const id_token = localStorage.getItem('id_token');
        const registro = await fetch(`${baseUrl}/estiramientos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + id_token
            },
            body: null
        });

        const data = await registro.json();
        dispatch({ type: GET_ESTIRAMIENTOS, payload: data });
    }
}

export const getEntrenamiento = async (id) => {
    const id_token = localStorage.getItem('id_token');
    const registro = await fetch(`${baseUrl}/entrenamientos/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + id_token
        },
        body: null
    });

    return await registro.json();
}

export const getProgresoActual = () => {

    return async (dispatch) => {
        const id_token = localStorage.getItem('id_token');
        const localUser = JSON.parse(localStorage.getItem('localUser'));

        const registro = await fetch(`${baseUrl}/progreso/last/${localUser?.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + id_token
            },
            body: null
        });

        const data = await registro.json();
        dispatch({ type: GET_PROGRESO_ACTUAL, payload: data?.terminada || data?.abandonada ?  {} : data }); 
    }
}


export const get2UltimosProgresoActualPorEntrenamiento = (entrenamientoId) => {

    return async (dispatch) => {
        const id_token = localStorage.getItem('id_token');
        const localUser = JSON.parse(localStorage.getItem('localUser'));

        const registro = await fetch(`${baseUrl}/progreso/last2ByEntrenamiento/${localUser?.id}/${entrenamientoId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + id_token
            },
            body: null
        });

        const data = await registro.json();
        console.log('data progresos  45we1f5we1fwe14fwe:',entrenamientoId, data); 
        dispatch({ type: GET_ULTIMOS_PROGRESOS_ENTRENAMIENTO, payload: data }); 
    }
}

export const empezarEntrenamiento = async (entrenamientoID, currentEntrenamiento) => {

    if (currentEntrenamiento.entrenamientoId === entrenamientoID) {
        return 0;
    }

    if (currentEntrenamiento.id && !currentEntrenamiento.terminada && !currentEntrenamiento.abandonada) {
        return "No puedes iniciar un entrenamiento sin acabar el anterior";
    }

    const id_token = localStorage.getItem('id_token');
    const localUser = JSON.parse(localStorage.getItem('localUser'));

    const response = await fetch(`${baseUrl}/progreso`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + id_token
        },
        body: JSON.stringify({
            entrenamientoId: entrenamientoID,
            usuarioId: localUser?.id,
            fecha: new Date(),
            terminada: false
        })
    });

    const data = await response.json();
    return 0;
};


export const actualizarEntrenamiento = async (entrenamientoID, entrenamiento, currentEntrenamiento) => {

    if (!entrenamiento || !currentEntrenamiento.id) {
        return "No se puede actualizar un entrenamiento sin datos";
    }

    if (currentEntrenamiento.terminada || currentEntrenamiento.abandonada) {
        return "El entrenamiento ya se encuentra finalizado";
    }

    if (currentEntrenamiento.entrenamientoId !== entrenamientoID) {
        return "Se esta intentando actualizar un entrenamiento distinto al actual";
    }

    const id_token = localStorage.getItem('id_token');
    const localUser = JSON.parse(localStorage.getItem('localUser'));

    const response = await fetch(`${baseUrl}/progreso/${entrenamiento.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + id_token
        },
        body: JSON.stringify(entrenamiento)
    });

    const data = await response.json();
    return 0;
};




export const getCategories = () => {
    return async (dispatch) => {
        try {
            const id_token = localStorage.getItem('id_token');

            const registro = await fetch(`${baseUrl}/categorias`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + id_token
                }
            });

            const data = await registro.json();
            dispatch({ type: GET_CATEGORIES, payload: data });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('Error 401');
                localStorage.clear();
            }
            console.error(error);
        }
    }
}
export const putUsuario = async (usuario) => {
    console.log('usuario Perro:', usuario);
    //usuario.fechaNacimiento = null;
    // usuario.genero = 'HOMBRE';
    // usuario.accountType = 'FREE';
    // usuario.state = 'ACTIVE';
    const id_token = localStorage.getItem('id_token');
    const registro = await fetch(`${baseUrl}/users/updateInfo/${usuario?.id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + id_token
            },
            body: JSON.stringify(usuario)
        }
    );
    const data = await registro.json();
    //dispatch({ type: GET_CATEGORIES, payload: data });
}


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

// const URL = "http://213.218.240.192:8082/onegym-back/api/metodos"

// export const getMethods = () => {
//     return async (dispatch) => {
//         try {
//             const data = await axios.get(URL);
//             dispatch({ type: GET_METHODS, payload: data });

//         } catch (error) {
//             console.error(error);
//         }
//     }
// }

export const getMethods = () => {
    return async (dispatch) => {
        try {
            const id_token = localStorage.getItem('id_token');

            const registro = await fetch(`${baseUrl}/metodos`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + id_token
                },
                body: null
            });

            const data = await registro.json();
            dispatch({ type: GET_METHODS, payload: data });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('Error 401');
                localStorage.clear();
            }
            console.error(error);
        }
    }
}

export const getMetodo1 = (idToFind) => {
    return async (dispatch, getState) => {
        try {
            const { results } = getState();

            const data = results?.find(item => item.id === idToFind);
            dispatch({ type: GET_METODO, payload: data });
        } catch (error) {
            console.error(error);
        }
    }
}

export const addFav = (item) => {
    return (dispatch, getState) => {
        const data = item.id;
        dispatch({ type: ADD_FAV, payload: data });
    }
}

export const removeFav = (item) => {
    return (dispatch, getState) => {
        const { favorites } = getState();
        // Create a new array excluding the item with the matching ID
        const updatedFavorites = favorites.filter(favorite => favorite !== item.id);
        // Dispatch the action with the updated array
        dispatch({ type: REMOVE_FAV, payload: updatedFavorites });
    }
}


export const selectedEntrenamiento = (entrenamientoSeleccionado) => {
    return (dispatch) => {
        const data = entrenamientoSeleccionado;
        dispatch({ type: SELECTED_ENTRENAMIENTO, payload: data });
    }
}

export const getUser = (username) => {
    return (dispatch) => {
        const data = username;
        dispatch({ type: GET_USER, payload: data });

    }
}


export const setHomeContent = (content) => {
    return (dispatch) => {
        const data = content;
        dispatch({ type: SET_HOME_CONTENT, payload: data });
    }
}

export function getHeaders() {
    const id_token = localStorage.getItem('id_token');
    return { 'Authorization': "Bearer " + id_token }
}

export const fetchBlobWithAuth = (url) => {
    return fetch(url, {
        headers: getHeaders()
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        });
}

export const getImageObject = async (id) => {

    //let fileElement = $('<img class="img-thumbnail multimedia-item">');
    try {
        const blob = await fetchBlobWithAuth(`${baseUrl}/multimedia/image/${id}`);
        const objectURL = URL.createObjectURL(blob);
        //fileElement.attr('src', objectURL);

        return `<img class="img-thumbnail multimedia-item" src = ${objectURL} >`;
    } catch (error) {
        console.error('Error fetching image:', error);
    }
}

