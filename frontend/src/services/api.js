// src/services/api.js
import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE,
});

// Token automatisch anhängen, falls vorhanden
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('dailytracker_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// LOGIN: gibt direkt den Token-String zurück
export const loginUser = async (email, password) => {
    const response = await api.post('/auth/login', { email, password }, {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text',
    });
    return response.data;
};

// REGISTER
export const registerUser = async (email, password) => {
    const response = await api.post('/auth/register', { email, password }, {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text',
    });
    return response.data;
};

// GET: DailyEntry
export const getTodayDailyEntry = async () => {
    const response = await api.get('/daily/today');
    return response.data;
};

// PATCH: DailyEntry (z. B. Schritte, Wasser)
export const patchDailyEntry = async (id, data) => {
    const response = await api.patch(`/daily/${id}`, data);
    return response.data;
};

// PATCH: SupplementEntry (nur 'genommen' ändern)
export const patchSupplementEntry = async (id, data) => {
    const response = await api.patch(`/supplement/${id}`, data);
    return response.data;
};

// PATCH: CustomEntry (z. B. value)
export const patchCustomEntry = async (id, data) => {
    const response = await api.patch(`/custom/${id}`, data);
    return response.data;
};
