import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LoaderService } from 'app/core/loader/loader.service';
import { Observable } from 'rxjs';
import { Response } from '@angular/http/src/static_response';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthHttpClient {

  private user;

  private loaderControl = {
    showLoader() {
      this.loaderService.show();
    },
    hideLoader() {
      this.loaderService.hide();
    }
  };

  constructor(
    loaderService: LoaderService,
    private http: Http,
    private cookieService: CookieService
  ) {
    this.loaderControl['loaderService'] = loaderService;
  }

  // Create authorization headers from localStorage to use for authenticated
  // requests
  createAuthorizationHeader(headers: Headers) {
    if (this.cookieService.check('currentUser')) {
      let user = JSON.parse(this.cookieService.get('currentUser'));
      headers.append('Authorization', 'Token ' + user.token);
    }
    headers.append('Content-Type', 'application/json');
  }

  // Replaces http.get, but uses authenticated headers
  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    // Getting loaderControl into lexical scope as this will not be available in catch and map callbacks
    let localLoaderControl = this.loaderControl;
    localLoaderControl.showLoader();
    return this.http.get(url, { headers: headers })
                    .catch((error: any) => {
                      localLoaderControl.hideLoader();
                      return Observable.throw(error);
                    })
                    .map((data: Response) => {
                      localLoaderControl.hideLoader();
                      return data;
                    })
  }

  // Replaces http.post, but uses authenticated headers
  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    // Getting loaderControl into lexical scope as this will not be available in catch and map callbacks
    let localLoaderControl = this.loaderControl;
    localLoaderControl.showLoader();
    return this.http.post(url, data, { headers: headers })
                    .catch((error: any) => {
                      localLoaderControl.hideLoader();
                      return Observable.throw(error);
                    })
                    .map((data: Response) => {
                      localLoaderControl.hideLoader();
                      return data;
                    });
  }

  put(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    // Getting loaderControl into lexical scope as this will not be available in catch and map callbacks
    let localLoaderControl = this.loaderControl;
    localLoaderControl.showLoader();
    return this.http.put(url, data, { headers: headers })
                    .catch((error: any) => {
                      localLoaderControl.hideLoader();
                      return Observable.throw(error);
                    })
                    .map((data: Response) => {
                      localLoaderControl.hideLoader();
                      return data;
                    });
  }
}
