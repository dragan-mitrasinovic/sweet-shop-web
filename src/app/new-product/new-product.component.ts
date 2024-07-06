import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { get_logged, is_logged } from '../../db/user_db';
import { Product } from '../models/product';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { add_product } from '../../db/product_db';

@Component({
    selector: 'app-new-product',
    standalone: true,
    imports: [FormsModule, NgIf, NgFor],
    templateUrl: './new-product.component.html',
    styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
        if (!is_logged()) this.router.navigate(["login"]);
        if (!get_logged().admin) this.router.navigate(["home"]);

        let row = 0;
        for (let i = 7; i <= 34; i++) {
            if (this.indexes.length == row) this.indexes.push([]);
            this.indexes[row].push(i);
            if (this.indexes[row].length == 7) row += 1;
        }
    }

    product: Product = new Product("", "cake", "", 0, "", "");
    url_prefix: string = "../../assets/products/";
    indexes: number[][] = [];
    msg: string = "";

    add_product() {
        this.msg = "";
        if (this.product.desc == "" || this.product.ingredients == "" || this.product.name == "") {
            this.msg = "Morate popuniti sva polja";
            return;
        }
        if (this.product.type != 'cake' && this.product.type != "cupcake") {
            this.msg = "Morate izabrati tip proizvoda";
            return;
        }
        if (this.product.image == "") {
            this.msg = "Morate izabrati sliku proizvoda";
            return;
        }
        if (isNaN(this.product.price) || this.product.price <= 0) {
            this.msg = "Morate uneti validnu cenu";
            return;
        }

        add_product(this.product);
        this.product = new Product("", "cake", "", 0, "", "");
        this.confirm_msg();
    }

    confirm_msg() {
        this.msg = "Uspesno dodat proizvod";
        setTimeout(() => {
            this.msg = "";
        }, 3000);
    }

}

