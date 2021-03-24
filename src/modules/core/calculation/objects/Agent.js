export class Agent {

    constructor(id, brand, activeCount, inactiveCount) {
        this.id = id;
        this.brand = brand;
        this.activeCount = activeCount;
        this.inactiveCount = inactiveCount;
    }


    get id() {
        return this.id;
    }

    get brand() {
        return this.brand;
    }

    get activeCount() {
        return this.activeCount;
    }

    get inactiveCount() {
        return this.inactiveCount;
    }


    set id(value) {
        this.id = value;
    }

    set brand(value) {
        this.brand = value;
    }

    set activeCount(value) {
        this.activeCount = value;
    }

    set inactiveCount(value) {
        this.inactiveCount = value;
    }
}