import axios from 'axios';
import {BASE_URL} from './api-constants';
import {AuthApi} from "../AuthApi";
import tokenUtility from "./tokenUtility";
import {ROUTES_PATHS} from "../../layout/routes-constants";


const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const PUBLIC_APIS = ['/auth/login', '/auth/me', '/auth/token/refresh']

instance.interceptors.request.use(
    (config) => {
        const token = tokenUtility.getTokens().accessToken;
        if (token && config.headers) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    (res) => {
        return res;

    },
    async (err) => {
        const originalConfig = err.config;
        if (
            !PUBLIC_APIS
                .some((path) => originalConfig?.url?.includes(path)) &&
            err.response
        ) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const {data: {accessToken}} = await AuthApi.refreshTokens(tokenUtility.getTokens()?.refreshToken);
                    tokenUtility.setTokens({accessToken});

                    return instance(originalConfig);
                } catch (_error) {
                    window?.location?.replace(window.location.path + '/' + ROUTES_PATHS.LOGIN_PAGE)
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    },
);


export default instance;