import axios from 'axios';
import {BASE_URL} from './api-constants';
import {AuthApi} from "./AuthApi";

let instance = ""
// const instance = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });
//
// instance.interceptors.request.use(
//     (config) => {
//         const token = tokenUtility.getTokens().accessToken;
//         if (token && config.headers) {
//             config.headers['Authorization'] = 'Bearer ' + token;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     },
// );
//
// instance.interceptors.response.use(
//     (res) => {
//         return res;
//
//     },
//     async (err) => {
//         const originalConfig = err.config;
//         debugger
//         if (
//             !['/auth/login', '/auth/me']
//                 .some((path) => originalConfig?.url?.includes(path)) &&
//             err.response
//         ) {
//             // Access Token was expired
//             if (err.response.status === 401 && !originalConfig._retry) {
//                 originalConfig._retry = true;
//                 debugger;
//                 try {
//                     const {data: {accessToken}} = await AuthApi.refreshTokens(tokenUtility.getTokens().refreshToken);
//                     tokenUtility.setTokens({accessToken});
//
//                     return instance(originalConfig);
//                 } catch (_error) {
//                     return Promise.reject(_error);
//                 }
//             }
//         }
//
//         return Promise.reject(err);
//     },
// );


export default instance;