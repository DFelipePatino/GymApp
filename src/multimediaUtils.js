const baseUrl = "https://backdev.onetrainingteam.com/onegym-backtest/api";

function getHeaders() {
    const id_token = localStorage.getItem('id_token');
    return { 'Authorization': "Bearer " + id_token }
}

export function fetchBlobWithAuth(endpoint) {

    return fetch(baseUrl + endpoint, {
        headers: getHeaders()
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .catch(error => {
            console.error('Fetch error:', error);
            throw error;
        });
}



