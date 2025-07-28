// Axios
import axios from "axios";

// Backend URL from .env
const BASE_URL = import.meta.env.VITE_API_URL

export const submitScore = async (score, token) => {
    const data = {
        score_submitted: score,
        auth_token: token
    };
    const response = await axios.post(`${BASE_URL}/score`, data);
    return response.data;
};