import axios, { AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';

export const register = (email: string, password: string): Promise<AxiosResponse<any>> => {
    return axios.post('/api/users', {
        email, password
    });
}

export const login = (email: string, password: string): Promise<AxiosResponse<any>> => {
    return axios.post('/api/users/login', {
        email, password
    });
}

export const logout = (): Promise<AxiosResponse<any>> => {
    return axios.delete('/api/users/logout');
}

export const hasLoginCookie = (): boolean => {
    const cookies: Cookies = new Cookies();
    return cookies.get('jwt') ? true : false;
}