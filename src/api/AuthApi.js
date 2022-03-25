/**
 * Describes AUTH calls
 */
import {BASE_URL} from "./api-constants";
import axios from "axios";
// import axios from "./axios-config"


export class AuthApi {
    static baseURL = `${BASE_URL}/auth`;

    /**
     * Method to receive tokens
     */
    static async login(loginDto) {
        try {
            const {data} = await axios.post(`${this.baseURL}/login`, loginDto);
            return data;
        } catch (e) {
            console.error(e);
        }
        return {};
    }

    /**
     * @param {string} refreshToken which will be used to receive accessToken
     */
    static async refreshTokens(refreshToken) {
        return await axios.get(`${this.baseURL}/token/refresh`, {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });
    }

    /**
     * @return {any} current user
     */
    static async getMe() {
        const {data} = await axios.get(`${this.baseURL}/me`);
        return data;
    }

    static async register(payload) {
        debugger
        const {data} = await axios.post(`${this.baseURL}/register`, payload)
        return data
    }
}
