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
    SET_METODO_ID,
    ADD_FAV,
    REMOVE_FAV,
    SELECTED_ENTRENAMIENTO,
    GET_BANNER,
    GET_CATEGORIES,
    GET_GOOGLE,
    GET_ENTRENAMIENTO_ACTUAL
} from "./action-types";



// export const getBanner = () => {
//     return async (dispatch) => {
//         // const data = await axios.get("http://213.218.240.192:8082/onegym-back/api/banner");
//         const data = await axios.get("http://localhost:8082/onegym-back/api/banner");
//         dispatch({ type: GET_BANNER, payload: data });
//     }
// }

// const baseUrl = "http://localhost:8082/onegym-back/api";

const baseUrl = "https://backdev.onetrainingteam.com/onegym-backtest/api";

export const getGoogle = () => {
    return async (dispatch) => {
        const id_token = localStorage.getItem('id_token');
        const response = await fetch(`${baseUrl}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + id_token
            },
            body: null
        });

        if (response.ok) {
            const data = await response.json();
            dispatch({ type: GET_GOOGLE, payload: data });
        } else {
            // Handle error response
            console.error('Failed to fetch data from Google API');
        }
    };
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
export const getEntrenamientoActual = () => {
    return async (dispatch) => {
        const id_token = localStorage.getItem('id_token');
        const localUser = localStorage.getItem('localUser');
        const registro = await fetch(`${baseUrl}/progreso/last/${localUser?.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + id_token
            },
            body: null
        });

        const data = await registro.json();
        dispatch({ type: GET_ENTRENAMIENTO_ACTUAL, payload: data });
    }
}

export const empezarEntrenamiento = (entrenamientoID) => {
    return async (dispatch, getState) => {
        console.log('entrenamientoID:', entrenamientoID);

        console.log('entro al action');
        const { currentEntrenamiento } = getState();
        console.log(currentEntrenamiento, "currentEntrenamiento");

        if (!currentEntrenamiento.terminado && (currentEntrenamiento.id || currentEntrenamiento.entrenamientoId === entrenamientoID)) {
            return;
        }

        console.log('llamamos a la action empezarEntrenamiento');
        const id_token = localStorage.getItem('id_token');
        const localUser = JSON.parse(localStorage.getItem('localUser'));

        const response = await fetch(`${baseUrl}/progreso/last/${localUser?.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + id_token
            },
            body: JSON.stringify({
                entrenamientoId: entrenamientoID,
                usuarioId: localUser?.id,
                fecha: new Date(),
                terminado: false
            })
        });

        const data = await response.json();
        console.log('Success crear entrenamiento actual', data);

        // You may want to dispatch some action here to update the state
        // dispatch({ type: 'SET_CURRENT_ENTRENAMIENTO', payload: data });
    };
};




export const getCategories = () => {
    return async (dispatch) => {
        const id_token = localStorage.getItem('id_token');
        const registro = await fetch(`${baseUrl}/categorias`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + id_token
                }
            }
        );
        const data = await registro.json();
        dispatch({ type: GET_CATEGORIES, payload: data });
    }
}

export const putUsuario = async (usuario) => {
    console.log('usuario Perro:', usuario);
    //usuario.fechaNacimiento = null;
    // usuario.genero = 'HOMBRE';
    // usuario.accountType = 'FREE';
    // usuario.state = 'ACTIVE';
    const id_token = localStorage.getItem('id_token');
    const registro = await fetch(`${baseUrl}/users/updateinfo/${usuario?.id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + id_token
            },
            body: JSON.stringify(usuario)
        }
    );
    console.log('registro:', registro);
    const data = registro.json();
    console.log('Success actrualizar:', data);
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
        const id_token = localStorage.getItem('id_token');
        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + id_token
        //     }
        // };
        // try {
        //     const data = await axios.get('http://localhost:8082/onegym-back/api/metodos', config);
        //     dispatch({ type: GET_METHODS, payload: data });

        // } catch (error) {
        //     console.error(error);
        // }

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
    }
}

export const getMetodo1 = (idToFind) => {
    return async (dispatch, getState) => {
        try {
            const { results } = getState();

            const data = results?.data?.find(item => item.id === idToFind);

            dispatch({ type: GET_CARDIO, payload: data });
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

