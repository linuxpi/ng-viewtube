import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HmacSHA512 } from 'crypto-js';
import { SECRET_KEY } from "app/constants";
import { AuthHttpClient } from 'app/_guards/authenticated_http'
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
const API_ROOT = environment.api_root;

@Injectable()
export class AuthenticationService {
    constructor(
      private http: AuthHttpClient,
      private cookieService: CookieService
    ) { }

    login(username: string, raw_password: string) {
      let password = HmacSHA512(raw_password, SECRET_KEY).toString();
      return this.http.post(API_ROOT + 'accounts/sign-in/', JSON.stringify({username: username, password: password}))
                      .map((response: Response) => {
                            let data = response.json();
                            if (data && data.token) {
                              // store user details and token in local storage to keep user logged in between page refreshes
                              this.cookieService.set('currentUser', JSON.stringify(data), 10/360);
                            }
                            return data;
                      });
    }

    logout() {
        return this.http.get(API_ROOT + '/v1.1/api/account/logout/')
                        .map((response: Response) => {
                          this.removeUserData();
                        });
    }

    // Function to remove user data
    removeUserData() {
      this.cookieService.delete('currentUser');
    }

    isUserDataAvailable() {
      return this.cookieService.check('currentUser');
    }
}
