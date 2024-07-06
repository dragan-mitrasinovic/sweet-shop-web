import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { get_logged, is_logged, set_user } from '../../db/user_db';
import { Notification } from '../models/notification';
import { FooterComponent } from '../footer/footer.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-notifications',
    standalone: true,
    imports: [FooterComponent, NgFor],
    templateUrl: './notifications.component.html',
    styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
        if (!is_logged()) this.router.navigate(["login"]);
        this.nots = get_logged().nots;
        this.nots.reverse();
    }

    nots: Notification[] = [];

    read(not: Notification) {
        this.nots.reverse();
        not.seen = true;
        let user = get_logged();
        for (let i = 0; i < this.nots.length; i++) {
            if (this.nots[i].text == not.text && !this.nots[i].seen && this.nots[i].order == not.order) {
                this.nots[i] = not;
                break;
            }
        }
        user.nots = this.nots;
        set_user(user.username, user, true);
        this.nots.reverse();
    }

    go_to_order(not: Notification) {
        localStorage.setItem("orderview", JSON.stringify(not.order));
        if (get_logged().admin) localStorage.setItem("orderviewadmin", JSON.stringify(not.order));
        this.router.navigate(["order_view"]);
    }

    get_logged() {
        return get_logged();
    }
}

