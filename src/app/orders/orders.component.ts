import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { get_admin, get_logged, get_user, is_logged, set_user } from '../../db/user_db';
import { Order } from '../models/order';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';
import { Notification } from '../models/notification';
import { get_orders, set_orders } from '../../db/order_db';

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [NgFor, NgIf, FormsModule],
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
        if (!is_logged()) this.router.navigate(["login"]);
        if (!get_logged().admin) this.router.navigate(["home"]);

        this.get_data();
    }

    orders: Order[] = [];
    current_order: Order = new Order("");
    index: number = 0;
    user: User = new User("", "", "", "", "", "", false);

    get_data() {
        let orders = get_orders();
        this.orders = [];
        orders.forEach(element => {
            if (element.accepted && !element.done) this.orders.push(element);
        });

        let specific_order = localStorage.getItem("orderviewadmin");
        if (specific_order != null) {
            for (let i = 0; i < this.orders.length; i++) {
                if (this.compare_orders(this.orders[i], JSON.parse(specific_order))) {
                    this.index = i;
                    this.current_order = this.orders[i];
                    console.log(this.current_order.items);
                    break;
                }
            }
            localStorage.removeItem("orderviewadmin");
        } else {
            this.index = 0;
            this.current_order = this.orders[0];
        }
        this.get_user();
    }

    next_order(inc: number) {
        this.index = (this.index + inc) % this.orders.length;
        this.current_order = this.orders[this.index];
        this.get_user();
    }

    get_user() {
        this.user = get_user(this.current_order.user)!;
    }

    process_order(accepted: boolean) {
        this.orders[this.index].accepted = accepted;
        if (accepted) {
            this.user.nots.push(new Notification("Vasa porudzbina je prihvacena", this.current_order));
            this.orders[this.index].processing = true;
        } else {
            this.user.nots.push(new Notification("Vasa porudzbina je odbijena", this.current_order));
            this.delete_notifications();
        }
        set_user(this.user.username, this.user);
        set_orders(this.orders);
        this.get_data();
    }

    finish_order() {
        this.user.nots.push(new Notification("Vasa porudzbina je spremna i poslata", this.current_order));
        this.delete_notifications();
        this.orders[this.index].done = true;

        set_user(this.user.username, this.user);
        set_orders(this.orders);
        this.get_data();
    }

    compare_orders(a: Order, b: Order) {
        if (a.user != b.user) return false;
        if (a.items.length != b.items.length) return false;
        let i = 0;
        while (i < a.items.length) {
            if (a.items[i].product.name != b.items[i].product.name || a.items[i].count != b.items[i].count) return false;
            i += 1;
        }
        return true;
    }

    delete_notifications() {
        let admin = get_admin();
        for (let i = admin.nots.length - 1; i >= 0; i--) {
            if (this.compare_orders(admin.nots[i].order, this.orders[this.index])) {
                admin.nots.splice(i, 1);
            }
        }

        set_user(admin.username, admin, true);
    }
}
