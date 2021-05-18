export class Agent {
  constructor(id, brand, activeObjCount = 0, inactiveObjCount = 0) {
    this.id = id;
    this.brand = brand;
    this.activeObjCount = activeObjCount;
    this.inactiveObjCount = inactiveObjCount;
    this.vehicles = [];
  }

  sort() {
    // if (this.vehicles.length) {
      console.log('Обрабатываемый клиент', this);
      this.vehicles.forEach((vehicle) => {
        vehicle.status === 13 ? this.inactiveObjCount++ : this.activeObjCount++;
      });
    // }
    // return;
  }

  calculateDate() {
    let a = new Date();
    let b = new Date(a.getFullYear(), a.getMonth());
    let c = new Date("2020-11-27T03:50:11.492008Z");
    console.log(b < c);
  }
}
