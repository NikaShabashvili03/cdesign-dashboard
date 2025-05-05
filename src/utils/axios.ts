import axios from 'axios';
import Cookies from "js-cookie";

const createAxiosInstance = (version: string) => {
    const instance = axios.create({
        baseURL: `${import.meta.env.VITE_URL}/en/api/${version}`, 
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get('csrftoken')
        },
    });

    instance.interceptors.request.use(
        (config) => {
            const csrftoken = Cookies.get("csrftoken");
            if (csrftoken) {
                config.headers["X-CSRFToken"] = csrftoken;
            }

            return config;
        },
        (error) => Promise.reject(error)
    );

    return instance;
}


export const axiosV1 = createAxiosInstance("v1");
export const axiosV2 = createAxiosInstance("v2");
export const axiosV3 = createAxiosInstance("v3");