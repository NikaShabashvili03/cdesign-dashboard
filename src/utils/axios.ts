import axios from 'axios';
import Cookies from 'js-cookie';
import i18n from '../i18n';

const createAxiosInstance = (version: string) => {
    const lang = i18n.language || 'en'
    const instance = axios.create({
        baseURL: `${import.meta.env.VITE_URL}/${lang}/api/${version}`,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get('csrftoken'),
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

    // i18n.on('languageChanged', (lng) => {
    //     console.log(lng)
    //     instance.defaults.baseURL = `${import.meta.env.VITE_URL}/${lng}/api/${version}`;
    // });

    return instance;
};

export const axiosV1 = createAxiosInstance("v1");
export const axiosV2 = createAxiosInstance("v2");
export const axiosV3 = createAxiosInstance("v3");
