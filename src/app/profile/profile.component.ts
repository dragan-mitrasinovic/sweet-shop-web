import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { get_logged, is_logged, set_user } from '../../db/user_db';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

    constructor(private router: Router) {

    }

    ngOnInit(): void {
        if (!is_logged()) this.router.navigate(["login"]);
        this.user = get_logged();
        this.old_username = this.user.username;
    }

    old_username: string = "";
    user: User = new User("", "", "", "", "", "", false);
    change_active: boolean = false;

    activate_change() {
        this.change_active = true;
    }

    finish_change() {
        console.log(this.user);
        set_user(this.old_username, this.user);
        localStorage.setItem("loggeduser", JSON.stringify(this.user));
        this.change_active = false;
    }

    cancel_change() {
        this.change_active = false;
    }

    logout() {
        localStorage.removeItem("loggeduser");
        this.router.navigate(["login"]);
    }
}
