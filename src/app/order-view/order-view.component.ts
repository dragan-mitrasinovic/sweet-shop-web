import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order } from '../models/order';
import { Router } from '@angular/router';
import { get_logged, is_logged } from '../../db/user_db';

@Component({
    selector: 'app-order-view',
    standalone: true,
    imports: [FooterComponent, NgFor, NgIf, FormsModule],
    templateUrl: './order-view.component.html',
    styleUrl: './order-view.component.css'
})
export class OrderViewComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
        if (!is_logged()) this.router.navigate(["login"]);
        if (get_logged().admin) this.router.navigate(["orders"]);

        let order = localStorage.getItem("orderview");
        if (order == null) this.router.navigate(["home"]);

        else this.order = JSON.parse(order);

        this.count_total_sum()
    }

    order: Order = new Order("");
    total_sum: number = 0;

    count_total_sum() {
        this.order.items.forEach(item => {
            this.total_sum += item.count * item.product.price;
        });
    }
}
