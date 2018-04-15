import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HmacSHA512 } from 'crypto-js';
import { AuthenticationService } from '../authentication/authentication.service';
import { SECRET_KEY } from "app/constants";
import { NavBarService } from 'app/core/navbar/navbar.service';
import { NavBarState } from 'app/core/navbar/navbar.state';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private navbarService: NavBarService,
    private fb: FormBuilder
  ) {
    if (authenticationService.isUserDataAvailable()) {
      this.navigateToChallengeList();
    }
    navbarService.updateState(<NavBarState>{show: false});

    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  private navigateToChallengeList() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    if (this.signupForm.status == 'VALID') {
      this.authenticationService.signup(this.signupForm.value).subscribe(
        data => {
          this.navigateToChallengeList();
        }, err => {
          alert("Cannot create an account");
        }
      );
    }
  }

  login (){
    this.router.navigate(['/login']);
  }

  ngOnInit() { }
}
