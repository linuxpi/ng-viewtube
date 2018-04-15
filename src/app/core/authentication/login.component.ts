import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HmacSHA512 } from 'crypto-js';
import { AuthenticationService } from './authentication.service';
import { SECRET_KEY } from "app/constants";
import { NavBarService } from 'app/core/navbar/navbar.service';
import { NavBarState } from 'app/core/navbar/navbar.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    "email" : "",
    "password" : "",
    "gethash": "false"
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private navbarService: NavBarService
  ) {
    if (authenticationService.isUserDataAvailable()) {
      this.navigateToChallengeList();
    }
    navbarService.updateState(<NavBarState>{show: false});
  }

  private navigateToChallengeList() {
    this.router.navigate(['/videos']);
  }

  onSubmit() {
    if (this.user.email && this.user.password) {
      this.authenticationService.login(this.user.email, this.user.password).subscribe(
        data => {
            this.navigateToChallengeList();
        }, err => {
          alert("Username or password incorrect");
        }
      );
    }
  }

  ngOnInit() { }

  signup() {
    this.router.navigate(['/signup']);
  }

}
