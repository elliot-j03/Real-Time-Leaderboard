// Axios
import axios from "axios";
// Firebase
import { auth } from "../config/firebase";

// Backend URL from .env
const BASE_URL = import.meta.env.VITE_API_URL

// Check if backend is runnig
export const backendPing = async () => {
    const response = await axios.get(`${BASE_URL}/ping`);
    return response.data;
}

// Initialise a new user node
export const initUserInDB = async (user, email, uid) => {
    const data = {
        user_name: user,
        email: email,
        user_uid: uid
    };
    const response = await axios.post(`${BASE_URL}/username/add`, data);
    return response.data;
};

// Get a username for a uid
export const getUserName = async (token) => {
    const data = {
        auth_token: token
    };
    const response = await axios.post(`${BASE_URL}/username/get/${auth?.currentUser?.uid}`, data);
    return response.data;
};

// Check if a username is already taken
export const checkUserName = async (user) => {
    const data = {
        user_name: user
    };
    const response = await axios.post(`${BASE_URL}/username/check`, data);
    return response.data;
}

// Submit a score
export const submitScore = async (score, token, uid) => {
    const data = {
        score_submitted: score,
        auth_token: token,
        user_uid: uid
    };
    const response = await axios.post(`${BASE_URL}/score`, data);
    return response.data;
};