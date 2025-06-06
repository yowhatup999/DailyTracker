// src/services/api.js
import axios from 'axios';

const API_BASE = 'http://localhost:8080/api'; // local usage

const api = axios.create({
    baseURL: API_BASE,
});

export function formatDateToGerman(dateStr) {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}.${month}.${year}`;
}

// === Interceptors für Token-Handling ===
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('dailytracker_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            const refreshToken = localStorage.getItem('dailytracker_refresh');
            if (!refreshToken) throw new Error('Kein Refresh-Token vorhanden');

            const response = await axios.post(`${API_BASE}/auth/refresh-token`, {
                refreshToken,
            }, {
                headers: { 'Content-Type': 'application/json' },
            });

            const { accessToken, username, email } = response.data;
            localStorage.setItem('dailytracker_token', accessToken);
            if (username) {
                localStorage.setItem('dailytracker_username', username);
            }
            if (email) {
                localStorage.setItem('dailytracker_email', email);
            }

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return api(originalRequest);
        } catch (refreshError) {
            console.error('Token-Refresh fehlgeschlagen:', refreshError);
            localStorage.removeItem('dailytracker_token');
            localStorage.removeItem('dailytracker_refresh');
            window.location.href = '/login';
            return Promise.reject(refreshError);
        }
    }
);

// === Auth ===
export const loginUser = async (email, password) => {
    const response = await api.post('/auth/login', { email, password }, {
        headers: { 'Content-Type': 'application/json' },
    });

    const { accessToken, refreshToken, username, email: returnedEmail } = response.data;

    localStorage.setItem('dailytracker_token', accessToken);
    localStorage.setItem('dailytracker_refresh', refreshToken);
    localStorage.setItem('dailytracker_username', username);
    localStorage.setItem('dailytracker_email', returnedEmail);

    return { accessToken, refreshToken, username, email: returnedEmail };
};

export const registerUser = async (email, password) => {
    const response = await api.post('/auth/register', { email, password }, {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text',
    });
    return response.data;
};

export const refreshToken = async () => {
    const refreshToken = localStorage.getItem('dailytracker_refresh');
    if (!refreshToken) throw new Error('Kein Refresh-Token gespeichert');

    const response = await api.post('/auth/refresh-token', {
        refreshToken,
    }, {
        headers: { 'Content-Type': 'application/json' },
    });

    const { accessToken } = response.data;
    localStorage.setItem('dailytracker_token', accessToken);
    return accessToken;
};

// === DailyEntry ===
export const createDailyEntry = async (data) => {
    const fixedData = { ...data, datum: formatDateToGerman(data.datum) };
    const response = await api.post('/daily', fixedData);
    return response.data;
};

export const patchDailyEntry = async (id, data) => {
    const response = await api.patch(`/daily/${id}`, data);
    return response.data;
};

export const getTodayDailyEntry = async () => {
    const response = await api.get('/daily/today');
    return response.data;
};

// === SupplementEntry ===
export const createSupplementEntry = async (dailyEntryId, data) => {
    const fixedData = { ...data, datum: formatDateToGerman(data.datum) };
    const response = await api.post(`/supplements/${dailyEntryId}`, fixedData);
    return response.data;
};

export const patchSupplementEntry = async (id, data) => {
    const response = await api.patch(`/supplements/${id}`, data);
    return response.data;
};

// === CustomEntry ===
export const createCustomEntry = async (dailyEntryId, data) => {
    const fixedData = { ...data };
    if (data.datum) fixedData.datum = formatDateToGerman(data.datum);
    const response = await api.post(`/custom/${dailyEntryId}`, fixedData);
    return response.data;
};

export const patchCustomEntry = async (id, data) => {
    const response = await api.patch(`/custom/${id}`, data);
    return response.data;
};

// === SupplementDefinition ===
export const createSupplementDefinition = async (data) => {
    const response = await api.post('/supplement-definition', data);
    return response.data;
};

export const getSupplementDefinitions = async () => {
    const response = await api.get('/supplement-definition');
    return response.data;
};

// === CustomEntryTemplate ===
export const createCustomEntryTemplate = async (data) => {
    const response = await api.post('/custom-template', data);
    return response.data;
};

// === Dashboard Info ===
export const getDashboardInfo = async () => {
    const response = await api.get('/dashboard/info');
    return response.data;
};