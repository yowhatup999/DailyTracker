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

// GET: Heute’s DailyEntry
export const getTodayDailyEntry = async () => {
    const response = await api.get('/daily/today');
    return response.data;
};
