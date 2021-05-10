import { Agent } from "../objects/Agent";

export function getAgentsArray(arr) {
  console.log("Массив на входе для обработки агентов", arr);

  return arr.map((el) => {
    return new Agent(el.id, el.name, 0, 0, []);
  }, []);
}

export async function sortVehicles(clients, vehiclesArray) {
  clients.forEach((client) => {
    vehiclesArray.forEach((vehicle, index) => {
      if (client.id === vehicle.owner) {
        client.vehicles.push(vehicle);
        vehiclesArray.splice(index, 1);
      }
    });
  });
}
