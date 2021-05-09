import {Agent} from "../objects/Agent";

export function getAgentsArray(arr) {
    console.log('Массив на входе для обработки агентов', arr)
    
    return arr.map(el => {
        return new Agent(el.id, el.name)
    }, []);
}

