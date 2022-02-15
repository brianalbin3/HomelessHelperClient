import axios from 'axios';

import Event from '../models/Event';


export const getEvents = async () => {
    return axios.get('/api/events');
}

// TODO: Return type
export const createEvent = async (event: Event) => {
    return axios.post('/api/events', event);
}
