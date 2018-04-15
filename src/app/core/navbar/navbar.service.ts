import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { NavBarState } from './navbar.state';

@Injectable()
export class NavBarService {
    private navbarSubject = new Subject<NavBarState>();

    navbarState = this.navbarSubject.asObservable();

    constructor () {}

    updateState(state: NavBarState) {
        this.navbarSubject.next(<NavBarState>state);
    }
}
