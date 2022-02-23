
import axios, { AxiosResponse } from 'axios';



export const findAccount = (account: string): Promise<AxiosResponse<any>> => {
    return axios.get(`/api/users/findaccount/${account}`);
}


export const sendResetCode = (email: string, selectedContactMethod: string): Promise<AxiosResponse<any>> => {
    return axios.post('/api/users/sendresetcode', {
        email, selectedContactMethod
    });
}

export const checkResetCode = (email: string, resetCode: string): Promise<AxiosResponse<any>> => {
    return axios.get('/api/users/checkresetcode', {

        params: {
            email,
            resetCode
            }
    });
}

export const changePassword = (email: string, password: string, resetCode: string): Promise<AxiosResponse<any>> => {
    return axios.post('/api/users/changepassword', {
        email,
        password,
        resetCode
    });
}

export const getCurrentUser = (): Promise<AxiosResponse<any>> =>  {
    return axios.get('/api/users/me');
}

export const updateNameFirst = (id: number, nameFirst: string): Promise<AxiosResponse<any>> => {
    return axios.patch('/api/users/namefirst', { id, nameFirst });
}

export const updateNameLast = (id: number, nameLast: string): Promise<AxiosResponse<any>> => {
    return axios.patch('/api/users/namelast', { id, nameLast });
}

export const updatePhoneNumber = (id: number, phoneNumber: string): Promise<AxiosResponse<any>> => {
    return axios.patch('/api/users/phonenumber', { id, phoneNumber });
}