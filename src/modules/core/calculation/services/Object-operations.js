import { Agent } from "../objects/Agent";

export function getAgentsArray(arr) {
  return arr.map((el) => {
    return new Agent(el.id, el.name, 0, 0, []);
  }, []);
}

//необходимо дописать проверку на отсутствие автомобилей у клиента;
export function sortVehicles(clientsArr, vehiclesArr) {
  const clientsV = vehiclesArr.reduce((total, cur) => {
    //получаем объект с ключами из id клиентов и массивами автомобилей в виде значений,
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

export function createPDF(data) {
  const dd = data.map((cur) => {
    return [cur.brand, cur.activeObjCount, cur.inactiveObjCount];
  });
  console.log(dd);

  const pdfData = {
    content: [
      {
        table: {
          body: [["Компания", "Кол-во активных", "Кол-во неактивных"], 
                  ...dd
                ],
        },
      },
    ],
  };

  pdfMake.createPdf(pdfData).open();
  // pdfMake.createPdf(pdfData).open({}, window);
}


