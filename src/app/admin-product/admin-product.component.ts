import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { get_logged, is_logged } from '../../db/user_db';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { add_comment } from '../../db/product_db';

@Component({
    selector: 'app-admin-product',
    standalone: true,
    imports: [FormsModule, NgFor, NgIf],
    templateUrl: './admin-product.component.html',
    styleUrl: './admin-product.component.css'
})
export class AdminProductComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
        if (!is_logged()) this.router.navigate(["login"]);
        if (!get_logged().admin) this.router.navigate(["home"]);

        let product = localStorage.getItem("product");
        if (product == null) this.router.navigate(["home"]);
        else this.product = JSON.parse(product);
    }

    product: Product = new Product("", "", "", 0, "", "");

}

