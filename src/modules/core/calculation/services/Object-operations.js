import { Agent } from "../objects/Agent";

export function getAgentsArray(arr) {

  return arr.map((el) => {
    return new Agent(el.id, el.name, 0, 0, []);
  }, []);
}

//необходимо дописать проверку на отсутствие автомобилей у клиента;
export function sortVehicles(clientsArr, vehiclesArr) {
  const clientsV = vehiclesArr.reduce((total, cur) => { //получаем объект с ключами из id клиентов и массивами автомобилей в виде значений,  
    if (!total[cur.owner]) total[cur.owner] = []; 
    total[cur.owner].push(cur); // cur === undefined, если автомобилей у клиента нет.
    return total;
  }, {});

  clientsArr.forEach((client) => {
    let arr = client.id;
    client.vehicles = clientsV[arr];
  });

  return clientsArr;
}

export function print(data) {
  data = []
}


