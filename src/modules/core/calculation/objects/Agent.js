export class Agent {

    constructor(id, brand, activeObjCount = 0, inactiveObjCount = 0) {
        this.id = id;
        this.brand = brand;
        this.activeObjCount = activeObjCount;
        this.inactiveObjCount = inactiveObjCount;
    }
}