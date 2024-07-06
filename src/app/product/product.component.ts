import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { get_logged, is_logged, set_user } from '../../db/user_db';
import { FooterComponent } from '../footer/footer.component';
import { Product } from '../models/product';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item } from '../models/item';
import { add_comment } from '../../db/product_db';

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [FooterComponent, NgFor, FormsModule, NgIf],
    templateUrl: './product.component.html',
    styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
        if (!is_logged()) this.router.navigate(["login"]);
        if (get_logged().admin) this.router.navigate(["orders"]);

        this.load_product();
        console.log(get_logged().cart);
    }

    product: Product = new Product("", "", "", 0, "", "");
    cnt: number = 0;
    comment: string = "";
    msg: string = "";

    inc(d: number) {
        this.cnt = Math.max(0, this.cnt + d);
    }

    post_comment() {
        if (this.comment.length == 0) return;
        add_comment(this.product.name, this.comment, get_logged().username);
        this.load_product();
    }

    load_product() {
        let product = localStorage.getItem("product");
        if (product == null) this.router.navigate(["home"]);
        else this.product = JSON.parse(product);
    }

    add_to_cart() {
        if (this.cnt == 0) return;

        let user = get_logged();
        for (let i = 0; i < user.cart.length; i++) {
            if (user.cart[i].product.name == this.product.name) {
                user.cart[i].count += this.cnt;
                set_user(user.username, user, true);
                this.confirm_msg();
                return;
            }
        }
        user.cart.push(new Item(this.cnt, this.product));
        set_user(user.username, user, true);
        this.confirm_msg();
    }

    confirm_msg() {
        this.msg = "Uspesno dodato u korpu";
        setTimeout(() => {
            this.msg = "";
        }, 3000);
    }

}

