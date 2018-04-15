import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { LoaderState } from './loader.state';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoaderService {
    private loaderSubject: Subject<LoaderState>;

    loaderState: Observable<any>;

    constructor () {
        this.loaderSubject = new Subject<LoaderState>();
        this.loaderState = this.loaderSubject.asObservable();
    }

    show() {
        this.loaderSubject.next(<LoaderState>{show: true});
    }

    hide() {
        this.loaderSubject.next(<LoaderState>{show: false});
    }
}
