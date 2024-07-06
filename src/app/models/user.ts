import { Item } from "./item";
import { Notification } from "./notification";

export class User {
    name: string = "";
    surname: string = "";
    phone: string = "";
    address: string = "";
    username: string = "";
    password: string = "";
    admin: boolean = false;
    nots: Notification[] = [];
    cart: Item[] = [];


    constructor(name: string, surname: string, phone: string, address: string, username: string, password: string, admin: boolean) {
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.address = address;
        this.username = username;
        this.password = password;
        this.admin = admin
    }
}