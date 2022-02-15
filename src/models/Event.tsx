interface Event {
    id?: number,
    title: string,
    start: Date,
    end: Date,
    description?: string,
}

export default Event;