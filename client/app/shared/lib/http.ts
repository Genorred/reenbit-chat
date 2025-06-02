import axios from "axios";
import {useUserStore} from '~/features/user/model/user';

const baseURL = `${import.meta.env.VITE_API_URL}/api` || 'http://localhost:5000/api';

export const $host = axios.create({
    baseURL,
    withCredentials: true
});

export const $authHost = axios.create({
    baseURL,
    withCredentials: true
});

$authHost.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await $host.post('/auth/refresh');
                const {user} = response.data;

                useUserStore.getState().set(user);
                return $authHost(originalRequest);
            } catch (error) {
                useUserStore.getState().set(null);
                throw error;
            }
        }

        return Promise.reject(error);
    }
);