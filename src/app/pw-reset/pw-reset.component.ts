import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { get_logged, is_logged, set_user } from '../../db/user_db';

@Component({
    selector: 'app-pw-reset',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './pw-reset.component.html',
    styleUrl: './pw-reset.component.css'
})
export class PwResetComponent implements OnInit {

    constructor(private router: Router) {

    }

    ngOnInit(): void {
        if (!is_logged()) this.router.navigate(["login"]);
        this.user = get_logged();
    }

    user: User = new User("", "", "", "", "", "", false);

    old_pw: string = "";
    new_pw: string = "";
    new_pw_rep: string = "";
    msg: string = "";

    commit_change() {
        this.msg = "";
        if (this.old_pw != this.user.password) {
            this.msg = "Pogresna stara lozinka";
            return;
        }
        if (this.new_pw != this.new_pw_rep) {
            this.msg = "Lozinke se ne podudaraju";
            return;
        }

        this.user.password = this.new_pw;
        set_user(this.user.username, this.user);
        localStorage.setItem("loggeduser", JSON.stringify(this.user));

        this.router.navigate(['profile'])
    }
}
