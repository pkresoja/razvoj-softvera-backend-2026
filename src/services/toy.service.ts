import type { ToyModel } from "../models/toy.model";
import axios from "axios";

const client = axios.create({
    baseURL: 'https://toy.pequla.com/api',
    headers: {
        'Accept': 'application/json',
        'X-Name': 'ToyShop/v1.0'
    }
})

export class ToyService {
    static async getToys() {
        return client.get<ToyModel[]>('/toy')
    }

    static async getToyByPermalink(permalink: string) {
        return client.get<ToyModel>(`/toy/permalink/${permalink}`)
    }
}