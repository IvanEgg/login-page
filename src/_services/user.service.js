import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    listUsers
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.apiUrl}/api/login`, requestOptions)
        .then(handleResponse)
        .then(token => {
            localStorage.setItem('token', token);

            return token;
        });
}

function logout() {
    localStorage.removeItem('token');
}

function listUsers() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/users?page=2`, requestOptions).then(handleGetUsersResponse);
}

function handleGetUsersResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        return data.data;
    }); 
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}