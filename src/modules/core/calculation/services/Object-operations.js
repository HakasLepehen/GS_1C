import { Agent } from "../objects/Agent";

export function getAgentsArray(arr) {
  console.log("Массив на входе для обработки агентов", arr);

  return arr.map((el) => {
    return new Agent(el.id, el.name, 0, 0, []);
  }, []);
}

export async function sortVehicles(clientsArr, vehiclesArr) {
  const clientsV = vehiclesArr.reduce((total, cur) => {
    if (!total[cur.owner]) total[cur.owner] = [];
    total[cur.owner].push(cur);
    return total;
  }, {});

  clientsArr.forEach((client) => {
    let arr = client.id;
    client.vehicles = clientsV[arr];
  });

  return clientsArr;
}
