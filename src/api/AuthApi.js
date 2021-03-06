/**
 * Describes AUTH calls
 */
import {BASE_URL} from "./base/api-constants";
import axios from "./base/axios-config"


export class AuthApi {
    static baseURL = `${BASE_URL}/auth`;

    /**
     * Method to receive tokens
     */
    static async login(loginDto) {
        const {data} = await axios.post(`${this.baseURL}/login`, loginDto);
        return data;
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
        const {data} = await axios.post(`${this.baseURL}/register`, payload)
        return data
    }

    static async checkEmail(registrationRequestId) {
        const {data} = await axios.post(`${this.baseURL}/check-email/${registrationRequestId}`)
        return data
    }
}
