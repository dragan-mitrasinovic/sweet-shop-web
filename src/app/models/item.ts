import { Product } from "./product";

export class Item {
    count: number = 0;
    product: Product = new Product("", "", "", 0, "", "");

    constructor(count: number, product: Product) {
        this.count = count;
        this.product = product;
    }
}