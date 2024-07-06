import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { FooterComponent } from '../footer/footer.component';
import { init } from '../../db/db_init';
import { get_logged, is_logged } from '../../db/user_db';
import { get_products } from '../../db/product_db';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [FooterComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

    constructor(private router: Router) {

    }

    products: Product[] = [];
    current_product: Product = new Product("", "", "", 0, "", "");
    index: number = 0;
    change_interval: any = setInterval(() => this.auto_next(), 3000);

    ngOnInit(): void {
        let inited = localStorage.getItem("inited")
        if (inited == null || JSON.parse(inited) == false) {
            init();
            this.router.navigate(["login"]);
        }
        if (!is_logged()) {
            this.router.navigate(["login"]);
        }
        if (get_logged().admin) {
            this.router.navigate(["orders"]);
        }
        let all_products = get_products();
        let inc = 0;

        for (let i = 0; i < 5; i++) {
            let rng = Math.floor(Math.random() * 2) + 1;
            this.products.push(all_products[inc + rng]);
            inc += rng;
        }
        this.current_product = this.products[0];
    }

    next_product(inc: number) {
        this.index = (this.index + inc) % this.products.length;
        this.current_product = this.products[this.index];
        clearInterval(this.change_interval);
        this.change_interval = setInterval(() => this.auto_next(), 3000);
    }

    go_to_product(product: Product) {
        localStorage.setItem("product", JSON.stringify(product));
        this.router.navigate(["product"]);
    }

    auto_next() {
        this.index += 1;
        if (this.index >= this.products.length) this.index = 0;
        this.current_product = this.products[this.index];
    }
}
