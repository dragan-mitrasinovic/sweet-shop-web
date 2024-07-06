import { Component, OnInit } from '@angular/core';
import { init } from '../../db/db_init';
import { get_logged, is_logged } from '../../db/user_db';
import { get_products } from '../../db/product_db';
import { Product } from '../models/product';
import { Router } from '@angular/router';

@Component({
    selector: 'app-all-products',
    standalone: true,
    imports: [],
    templateUrl: './all-products.component.html',
    styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit {

    constructor(private router: Router) {

    }

    products: Product[] = [];
    current_product: Product = new Product("", "", "", 0, "", "");
    index: number = 0;

    ngOnInit(): void {
        let inited = localStorage.getItem("inited")
        if (inited == null || JSON.parse(inited) == false) {
            init();
            this.router.navigate(["login"]);
        }
        if (!is_logged()) {
            this.router.navigate(["login"]);
        }
        if (!get_logged().admin) {
            this.router.navigate(["home"]);
        }
        this.products = get_products();
        this.current_product = this.products[0];
    }

    next_product(inc: number) {
        this.index = (this.index + inc) % this.products.length;
        this.current_product = this.products[this.index];
    }

    go_to_product(product: Product) {
        localStorage.setItem("product", JSON.stringify(product));
        this.router.navigate(["product_view"]);
    }
}
