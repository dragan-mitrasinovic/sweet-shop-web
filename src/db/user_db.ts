import { User } from "../app/models/user";
import { get_orders, set_orders } from "./order_db";

export function is_logged() {
    let loggeduser = localStorage.getItem("loggeduser");
    return loggeduser != null;
}

export function get_user(username: string) {
    let users = get_users();
    let user = new User("", "", "", "", "", "", false);
    users.forEach(element => {
        if (element.username == username) {
            user = element;
            return;
        }
    });
    return user;
}

export function get_users() {
    let return_array: User[] = [];
    let users = localStorage.getItem("users");
    if (users != null) {
        return_array = JSON.parse(users);
    }
    return return_array;
}

export function set_users(users: User[]) {
    localStorage.setItem("users", JSON.stringify(users));
}

export function set_user(username: string, user: User, logged: boolean = false) {
    let users = JSON.parse(localStorage.getItem("users")!);

    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username) {
            users[i] = user;
            set_users(users);
            break;
        }
    }
    if (logged) {
        localStorage.setItem("loggeduser", JSON.stringify(user));
    }
    if (username != user.username) {
        let orders = get_orders();
        for (let i = 0; i < orders.length; i++) {
            if (orders[i].user == username) orders[i].user = user.username;
        }
        set_orders(orders);
    }
}

export function get_logged() {
    let user = JSON.parse(localStorage.getItem("loggeduser")!);
    return user;
}

export function get_admin() {
    let users = get_users();
    let admin = new User("", "", "", "", "", "", true);
    users.forEach(element => {
        if (element.admin) {
            admin = element;
            return;
        }
    });

    return admin;
}