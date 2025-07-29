// Axios
import axios from "axios";

// Backend URL from .env
const BASE_URL = import.meta.env.VITE_API_URL

export const submitScore = async (score, token, uid) => {
    const data = {
        score_submitted: score,
        auth_token: token,
        user_uid: uid
    };
    const response = await axios.post(`${BASE_URL}/score`, data);
    return response.data;
};

export const addUserName = async (user, uid) => {
    const data = {
        user_name: user,
        user_uid: uid
    };
    const response = await axios.post(`${BASE_URL}/add-username`, data);
    return response.data;
}