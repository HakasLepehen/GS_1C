import axios from "axios";
import {initCalculator} from "../Сalculation";
import {Cookie} from "../objects/Cookie";

export async function getAgents(token) {
    const response = await axios.get(window.configuration.url + 'agents', {
        headers: {
            'X-Auth': token
        }
    });

    if (response.status === 401) {
        Cookie.clearCookies();
        initCalculator();
    }

    if (response.data) {
        return response.data
    }
}