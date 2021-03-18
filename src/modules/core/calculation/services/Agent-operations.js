import axios from "axios";
import {initCalculator} from "../Сalculation";
import {Cookie} from "../objects/Cookie";

export async function getAgents(token) {
        const resolve = await axios.get(window.configuration.url + 'agents', {
            headers: {
                'X-Auth': token
            }
        });

        if (resolve.status === 401) {
            Cookie.clearCookies();
            initCalculator();
        }

        if (resolve.data) {
            return resolve.data
        }
}