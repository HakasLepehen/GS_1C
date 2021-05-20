export class Agent {
  constructor(id, brand, platform, activeObjCount = 0, inactiveObjCount = 0) {
    this.id = id;
    this.brand = brand;
    this.platform = platform;
    this.activeObjCount = activeObjCount;
    this.inactiveObjCount = inactiveObjCount;
    this.vehicles = [];
  }

  countVehicles() {
    if (!this.vehicles) return;

    // console.log("Обрабатываемый клиент", this);
    this.vehicles.forEach((vehicle) => {
      // console.log(vehicle);
      vehicle.checkStatus();
      vehicle.status === 13 ? this.inactiveObjCount++ : this.activeObjCount++;
    });
  }
}
