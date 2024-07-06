import { Order } from "./order";
import { User } from "./user";

export class Notification {
    text: string = "";
    seen: boolean = false;
    order: Order = new Order("");

    constructor(text: string, order: Order) {
        this.text = text;
        this.order = order;
    }
}