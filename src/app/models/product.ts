import { Comment } from "./comment";

export class Product {
    name: string = "";
    type: string = "";
    desc: string = "";
    price: number = 0;
    image: string = "";
    ingredients: string = "";
    comments: Comment[] = [];

    constructor(name: string, type: string, desc: string, price: number, image: string, ingredients: string) {
        this.name = name;
        this.type = type;
        this.desc = desc;
        this.price = price;
        this.image = image;
        this.ingredients = ingredients;
    }
}