import { ObjectId } from "mongodb";

export default class Favorites {
    constructor(
        public name: string,
        public price: number,
        public id?: ObjectId) {}
}