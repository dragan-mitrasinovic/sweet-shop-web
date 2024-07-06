import { Comment } from "../app/models/comment";
import { Product } from "../app/models/product";

export function get_products() {
    let return_array: Product[] = [];
    let products = localStorage.getItem("products");
    if (products != null) {
        return_array = JSON.parse(products);
    }
    return return_array;
}

export function get_cakes() {
    let return_array: Product[] = [];
    let products = get_products();
    products.forEach(element => {
        if (element.type == "cake") return_array.push(element);
    });
    return return_array;
}

export function get_cupcakes() {
    let return_array: Product[] = [];
    let products = get_products();
    products.forEach(element => {
        if (element.type == "cupcake") return_array.push(element);
    });
    return return_array;
}

export function add_comment(product: string, comment: string, user: string) {
    let products = get_products();
    for (let i = 0; i < products.length; i++) {
        if (products[i].name == product) {
            products[i].comments.push(new Comment(user, comment));
            localStorage.setItem("product", JSON.stringify(products[i]));
            localStorage.setItem("products", JSON.stringify(products));
            return;
        }
    }
}

export function add_product(product: Product) {
    let products = get_products();
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
}