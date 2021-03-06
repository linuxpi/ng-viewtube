import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {LoaderService} from './loader.service';
import {LoaderState} from './loader.state';

@Component({
    selector: 'api-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {

    show = false;

    private subscription: Subscription;

    constructor(private loaderService: LoaderService) {
        this.subscription = this.loaderService.loaderState.subscribe(
            (state: LoaderState) => {
                this.show = state.show;
            }
        )
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
