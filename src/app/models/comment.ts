import { Product } from "./product";
import { User } from "./user";

export class Comment {
    username: string = "";
    text: string = "";

    constructor(username: string, text: string) {
        this.username = username;
        this.text = text;
    }
}