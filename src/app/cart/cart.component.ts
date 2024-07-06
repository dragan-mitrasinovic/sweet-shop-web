import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { Order } from '../models/order';
import { Item } from '../models/item';
import { Notification } from '../models/notification';
import { get_logged, is_logged, set_user } from '../../db/user_db';
import { add_order } from '../../db/order_db';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [NgFor, FormsModule, FooterComponent, NgIf],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
        if (!is_logged()) this.router.navigate(["login"]);
        if (get_logged().admin) this.router.navigate(["orders"]);
        this.cart = get_logged().cart;
        this.count_total();
    }

    cart: Item[] = [];
    total_sum: number = 0;

    inc(item: Item, d: number) {
        if (item.count + d == 0) {
            this.delete(item);
            return;
        }
        item.count = Math.max(0, item.count + d);
        for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i].product.name == item.product.name) {
                this.cart[i] = item;
                let user = get_logged();
                user.cart = this.cart;
                set_user(user.username, user, true);
            }
        }
        this.count_total();
    }

    delete(item: Item) {
        for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i].product.name == item.product.name) {
                this.cart.splice(i, 1);
                let user = get_logged();
                user.cart = this.cart;
                set_user(user.username, user, true);
            }
        }
        this.count_total();
    }

    count_total() {
        this.total_sum = 0;
        this.cart.forEach(item => {
            this.total_sum += item.count * item.product.price;
        });
    }

    make_order() {
        add_order(this.cart, get_logged().username);
        this.cart = [];

        let user = get_logged();
        user.cart = [];
        set_user(user.username, user, true);
        this.count_total();
    }
}
