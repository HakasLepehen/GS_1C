export class Vehicle {
  constructor(id, objName, owner, status, statusChangeDate, created) {
    this.id = id;
    this.objName = objName;
    this.owner = owner;
    this.status = status;
    this.statusChangeDate = statusChangeDate;
    this.created = created;
  }

  // checkStatus() {
  //     let monthBeginning = new Date(window.configuration.today.getFullYear(), window.configuration.today.getMonth());
  //     let dateOfCreatingVehicle = new Date(this.created);
  //     console.log(dateOfCreatingVehicle);
  //     console.log(this)

  //     // if (this.status == 13) {
  //     //     monthBeginning > new Date(this.statusChangeDate) ? this.status = 13 : this.status = 1;
  //     // } else {
  //     //     if (dateOfCreatingVehicle < monthBeginning) {
  //     //         this.status = 1;
  //     //     }
  //     // }
  //     // this.statusChangeDate < monthBeginning ? this.status = 13 : this.status = 1;

  //     if (monthBeginning > new Date(this.statusChangeDate)) {
  //         if (this.status === 13) {
  //             monthBeginning > new Date(this.statusChangeDate) ? this.status = 13 : this.status = 1;
  //         } else if(monthBeginning < new Date(this.statusChangeDate)) {
  //             if (dateOfCreatingVehicle < monthBeginning) {
  //                 this.status = 13;
  //             }
  //         }

  //         if(dateOfCreatingVehicle > monthBeginning) this.status = 1;
  //     }

  // }
  checkStatus() {
    const dateOfCreation = new Date(this.created).getTime(),
      monthBegin = new Date(
        window.configuration.today.getFullYear(),
        window.configuration.today.getMonth()
      ).getTime(),
      statusChangedDate = new Date(this.statusChangeDate).getTime();

    if (monthBegin < statusChangedDate) {
      // статус в течение месяца изменился, ставим активной
      if (this.status === 13) {
          this.status = 1;
      }
    }

    if (dateOfCreation > monthBegin) {
      // машину сделали в этом месяце, в любом случае активная
      this.status = 1;
    }
  }
}
