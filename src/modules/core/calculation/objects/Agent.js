export class Agent {
  constructor(id, brand, activeObjCount = 0, inactiveObjCount = 0) {
    this.id = id;
    this.brand = brand;
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

  render() {
    let wrapper = document.querySelector(".work-data");
    let div = document.createElement("div");

    div.className = "client-data";
    div.innerHTML = ` <div class="client-data-label">
                        <a>${this.brand}</a>
                      </div>

                      <div class="client-data-buttons">
                        <a role="button" class="active-objects">${this.activeObjCount}</a>
                        <a role="button" class="inactive-objects">${this.inactiveObjCount}</a>
                      </div>`;
    wrapper.appendChild(div);
  }
}
