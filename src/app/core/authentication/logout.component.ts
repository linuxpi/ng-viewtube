import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HmacSHA512 } from 'crypto-js';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-logout',
  template: '',
  styleUrls: []
})

export class LogoutComponent implements OnInit {

  public user: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.logout().subscribe(
      (data) => {
        this.router.navigate(['/login']);
        this.authenticationService.removeUserData();
      }
    );

    this.user = {
      "email": "",
      "password": "",
      "gethash": "false"
    }
  }

  ngOnInit() {}

}
