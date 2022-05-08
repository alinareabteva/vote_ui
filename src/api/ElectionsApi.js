import {BASE_URL} from "./base/api-constants";
import axios from "./base/axios-config"


export class ElectionsApi {
    static baseURL = `${BASE_URL}/elections`;

    static async createElection(payload) {
        const {data} = await axios.post(this.baseURL, payload)
        return data;
    }

    static async getElection(electionId) {
        const {data} = await axios.get(`${this.baseURL}/${electionId}`)
        return data;
    }

    static async getElections() {
        const {data} = await axios.get(this.baseURL)
        return data;
    }

    static async updateElection(payload) {
        const data = await  axios.put(`${this.baseURL}/${payload.id}`, payload)
        return data
    }

    static async deleteAll(electionIds = []) {
        const data = await  axios.delete(`${this.baseURL}?electionsToRemove=${electionIds.join()}`)
        return data
    }
}