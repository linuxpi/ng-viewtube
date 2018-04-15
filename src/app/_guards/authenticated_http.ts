import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoaderService } from 'app/core/loader/loader.service';
import { Observable } from 'rxjs';
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
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    this.loaderControl['loaderService'] = loaderService;
  }

  // Create authorization headers from localStorage to use for authenticated
  // requests
  createAuthorizationHeader() {
    if (this.cookieService.check('currentUser')) {
      let user = JSON.parse(this.cookieService.get('currentUser'));
      return new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token ' + user.token
      });
    } else {
      return new HttpHeaders({
        'Content-Type':  'application/json',
      });
    }
  }

  // Replaces http.get, but uses authenticated headers
  get(url) {
    let headers = this.createAuthorizationHeader();
    // Getting loaderControl into lexical scope as this will not be available in catch and map callbacks
    let localLoaderControl = this.loaderControl;
    localLoaderControl.showLoader();

    return this.http.get(url, { headers: headers })
      .catch(
        err => {
          localLoaderControl.hideLoader();
          return Observable.throw(err);
        }
      ).map(data => {
        localLoaderControl.hideLoader();
        return data;
      });
  }

  // Replaces http.post, but uses authenticated headers
  post(url, data) {
    let headers = this.createAuthorizationHeader();
    // Getting loaderControl into lexical scope as this will not be available in catch and map callbacks
    let localLoaderControl = this.loaderControl;
    localLoaderControl.showLoader();
    return this.http.post(url, data, { headers: headers })
      .catch(
        err => {
          localLoaderControl.hideLoader();
          return Observable.throw(err);
        }
      ).map(data => {
          localLoaderControl.hideLoader();
          return data;
      });
  }

  patch(url, data) {
    let headers = this.createAuthorizationHeader();
    // Getting loaderControl into lexical scope as this will not be available in catch and map callbacks
    let localLoaderControl = this.loaderControl;
    localLoaderControl.showLoader();
    // console.log(this.http.get(url, { headers: headers }));
    return this.http.patch(url, data, { headers: headers })
      .catch(
        err => {
          localLoaderControl.hideLoader();
          return Observable.throw(err);
        }
      ).map(data => {
        localLoaderControl.hideLoader();
        return data;
      });
  }
}
