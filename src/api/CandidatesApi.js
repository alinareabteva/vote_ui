import {BASE_URL} from "./base/api-constants";
import axios from "./base/axios-config"


export class CandidatesApi {
    static baseURL = `${BASE_URL}/candidate`;

    static async addCandidate(payload) {
        const {data} = await axios.post(this.baseURL, payload)
        return data;
    }

    static async getCandidate(candidateId) {
        const {data} = await axios.get(`${this.baseURL}/${candidateId}`)
        return data;
    }

    static async getCandidates() {
        const {data} = await axios.get(this.baseURL)
        return data;
    }

    static async updateCandidate(payload) {
        const data = await  axios.put(`${this.baseURL}`, payload)
        return data
    }

    static async deleteAll(candidatesId = []) {
        const data = await  axios.delete(`${this.baseURL}/all?candidatesToRemove=${candidatesId.join()}`)
        return data
    }
}