export class Company {

    constructor(brand, activeCount, inactiveCount) {
        this._brand = brand;
        this._activeCount = activeCount;
        this._inactiveCount = inactiveCount;
    }


    get brand() {
        return this._brand;
    }

    set brand(value) {
        this._brand = value;
    }

    get activeCount() {
        return this._activeCount;
    }

    set activeCount(value) {
        this._activeCount = value;
    }

    get inactiveCount() {
        return this._inactiveCount;
    }

    set inactiveCount(value) {
        this._inactiveCount = value;
    }
}