import { Item } from "./item";

export class Order {
    user: string = "";
    items: Item[] = [];
    ordered: boolean = false;
    accepted: boolean = true;
    processing: boolean = false;
    done: boolean = false;

    constructor(user: string) {
        this.user = user;
    }
}