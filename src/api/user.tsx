
import axios from 'axios';



export const findAccount = (account: string) => {
    return axios.get(`/api/users/findaccount/${account}`);
}


export const sendResetCode = (email: string, selectedContactMethod: string) => {
    return axios.post('/api/users/sendresetcode', {
        email, selectedContactMethod
    });
}

export const checkResetCode = (email: string, resetCode: string) => {
    return axios.get('/api/users/checkresetcode', {

        params: {
            email,
            resetCode
            }
    });
}

export const changePassword = (email: string, password: string, resetCode: string) => {
    return axios.post('/api/users/changepassword', {
        email,
        password,
        resetCode
    });
}

export const getCurrentUser = () =>  {
    return axios.get('/api/users/me');
}