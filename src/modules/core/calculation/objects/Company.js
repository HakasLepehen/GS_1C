export class Company {

    constructor(id, brand, activeCount, inactiveCount) {
        this._id = id;
        this._brand = brand;
        this._activeCount = activeCount;
        this._inactiveCount = inactiveCount;
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
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