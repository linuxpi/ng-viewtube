import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationService } from '../authentication/authentication.service';

import { NavBarService } from './navbar.service';
import { NavBarState } from './navbar.state';
import { Router } from '@angular/router';

@Component({
    selector: 'nav-bar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {

    state: NavBarState = <NavBarState>{show: true, showHome: true, showLogout: true};

    private subscription: Subscription;

    constructor (
        private navBarService: NavBarService,
        private authService: AuthenticationService,
        private router: Router
    ) {
        this.subscription = this.navBarService.navbarState.subscribe(
            (state: NavBarState) => {
                this.state = state;
                if (authService.isUserDataAvailable()) {
                  this.state.showLogin = false;
                }
            }
        );
    }

    ngOnInit() {}

    logoutUser() {
        this.authService.logout().subscribe(
          (data) => {
            this.router.navigate(['/']);
          }
        );
    }

    loginUser() {
      this.router.navigate(['/login']);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
