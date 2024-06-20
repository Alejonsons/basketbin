import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.sportsdata.io/v3/nba',
});

export default api;