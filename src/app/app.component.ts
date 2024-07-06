import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { get_logged, is_logged } from '../db/user_db';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

    ngOnInit(): void {
    }

    title = 'SlatkiZalogaji';

    show() {
        return is_logged();
    }

    is_admin() {
        if (!this.show()) return false;
        let user = get_logged();
        return user.admin;
    }
}
