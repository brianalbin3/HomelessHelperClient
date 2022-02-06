// TODO: Should I rename this?

import axios from 'axios';

import Cookies from 'universal-cookie';


// TODO: Return type
export const register = (email: string, password: string) => {
    return axios.post('/api/users', {
        email, password
    });
}

export const login = (email: string, password: string) => {
    return axios.post('/api/users/login', {
        email, password
    });
}

export const logout = () => {
    return axios.delete('/api/users/logout');
}

export const hasLoginCookie = (): boolean => {
    const cookies: Cookies = new Cookies();
    return cookies.get('jwt') ? true : false;
}