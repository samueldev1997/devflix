
// BASE DA URL: https://api.themoviedb.org/3/
// URL DA API: movie/popular?api_key=e835ad415f6a33c06f8a84507b23aa28

import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;