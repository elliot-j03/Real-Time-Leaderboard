import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL

export const submitScore = async (score) => {
    const res = await axios.post(`${BASE_URL}/submit-score`, { score });
    return res.data;
};

export const getLeaderboard = async () => {
    const res = await axios.get(`${BASE_URL}/leaderboard`);
    return res.data;
}