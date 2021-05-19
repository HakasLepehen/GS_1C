export class Vehicle {

    constructor(id, objName, owner, status, statusChangeDate, created) {
        this.id = id;
        this.objName = objName;
        this.owner = owner;
        this.status = status;
        this.statusChangeDate = statusChangeDate;
        this.created = created;
    }

    checkStatus() {
        let monthBeginning = new Date(window.configuration.today.getFullYear(), window.configuration.today.getMonth());
        let dateOfCreatingVehicle = new Date(this.created);

        if (this.status == 13) {
            monthBeginning > new Date(this.statusChangeDate) ? this.status = 13 : this.status = 1;
        } else {
            if (dateOfCreatingVehicle < monthBeginning) {
                this.status = 1;
            }
        }
        // this.statusChangeDate < monthBeginning ? this.status = 13 : this.status = 1;
    }
}