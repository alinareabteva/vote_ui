import {BASE_URL} from "./base/api-constants";
import axios from "./base/axios-config"


export class VotingApi {
    static baseURL = `${BASE_URL}/voting`;

    static async getTodayVoting() {
        const {data} = await axios.get(this.baseURL)
        return data;
    }

    static async submitVoting(payload) {
        const {data} = await axios.post(this.baseURL, payload)
        return data;
    }
}