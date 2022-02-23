import axios, { AxiosResponse } from 'axios';

import Event from '../models/Event';


export const getEvents = async (): Promise<AxiosResponse<any>> => {
    return axios.get('/api/events');
}

export const createEvent = async (event: any): Promise<AxiosResponse<any>> => {
    return axios.post('/api/events', event);
}

export const deleteEvent = (id: number): Promise<AxiosResponse<any>> => {
    return axios.delete(`/api/events/${id}`);
}

export const updateEvent = (event: Event): Promise<AxiosResponse<any>> => {
    console.log("updateEvent() with event=", event)
    return axios.put('/api/events/', {
        event
    });
}