import api from "../../../shared/api/axios";

export const bookRide = (data) => api.post("/rides/book", data);
