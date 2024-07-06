import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Product } from '../models/product';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { get_logged, is_logged } from '../../db/user_db';
import { get_cakes } from '../../db/product_db';

@Component({
    selector: 'app-cakes',
    standalone: true,
    imports: [FooterComponent, NgFor],
    templateUrl: './cakes.component.html',
    styleUrl: './cakes.component.css'
})
export class CakesComponent implements OnInit {

    constructor(private router: Router) {

    }

    ngOnInit(): void {
        if (!is_logged()) this.router.navigate(["login"]);
        if (get_logged().admin) this.router.navigate(["orders"]);

        this.products = get_cakes();
        console.log(this.products)
    }

    products: Product[] = [];
    index: number = 0;
    display_indexes: number[] = [0, 1, 2];


    next_product(inc: number) {
        this.index = this.index + inc;
        this.display_indexes = [];
        let i = this.index;
        while (i < this.products.length && i - this.index < 3) {
            this.display_indexes.push(i);
            i += 1;
        }
    }

    go_to_product(product: Product) {
        localStorage.setItem("product", JSON.stringify(product));
        this.router.navigate(["product"]);
    }
}