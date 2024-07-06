import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { get_logged, get_users, is_logged } from '../../db/user_db';
import { AppComponent } from '../app.component';
import { init } from '../../db/db_init';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

    constructor(private router: Router) {

    }

    ngOnInit(): void {
        let inited = localStorage.getItem("inited")
        if (inited == null || JSON.parse(inited) == false) {
            init();
        }
        if (is_logged() && !get_logged().admin) {
            this.router.navigate(["home"]);
        }
        if (is_logged() && get_logged().admin) {
            this.router.navigate(["orders"]);
        }
        this.users = get_users();
    }

    username: string = "";
    password: string = "";
    users: User[] = [];
    msg: string = "";

    login() {
        this.msg = "";
        this.users.forEach(user => {
            if (user.username == this.username && user.password == this.password) {
                localStorage.setItem("loggeduser", JSON.stringify(user));

                if (user.admin) this.router.navigate(["orders"]);
                else this.router.navigate(["home"]);

                return;
            }
        });
        this.msg = "Pogresni kredencijali";
    }
}
