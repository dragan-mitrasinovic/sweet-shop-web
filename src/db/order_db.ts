import { Item } from "../app/models/item";
import { Notification } from "../app/models/notification";
import { Order } from "../app/models/order";
import { get_admin, get_logged, set_user } from "./user_db";

export function get_orders() {
    let return_array: Order[] = [];
    let orders = localStorage.getItem("orders");
    if (orders != null) {
        return_array = JSON.parse(orders);
    }
    return return_array;
}

export function add_order(cart: Item[], username: string) {
    let orders = JSON.parse(localStorage.getItem("orders")!);
    let order = new Order(username);
    order.items = cart;
    order.ordered = true;
    order.accepted = true;
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    let user = get_logged();
    user.nots.push(new Notification("Vasa porudzbina je uspesno poslata", order));
    set_user(username, user, true);

    let admin = get_admin();
    admin.nots.push(new Notification("Stigla vam je porudzbina", order));
    set_user(admin.username, admin, false);
}

export function set_orders(orders: Order[]) {
    localStorage.setItem("orders", JSON.stringify(orders));
}