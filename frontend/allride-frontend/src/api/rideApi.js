import api from "./axios";

export const bookRide = (data) => api.post("/rides/book", data);
