import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {RouterModule, Routes} from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {AuthGuard} from './_guards/index';

import { AppComponent } from './app.component';
import {LoginComponent} from './core/authentication/login.component';
import {LogoutComponent} from './core/authentication/logout.component';
import {NavBarComponent} from './core/navbar/navbar.component';
import {LoaderComponent} from './core/loader/loader.component';

import {AuthHttpClient} from './_guards/authenticated_http';
import {AuthenticationService} from './core/authentication/authentication.service';
import {NavBarService} from './core/navbar/navbar.service';
import {LoaderService} from './core/loader/loader.service';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { VideosService } from './videos/videos.service';
import { VideosComponent } from './videos/videos.component';
import { VideoItemComponent } from './videos/video-item/video-item.component';
import { VideoEditComponent } from './videos/video-edit/video-edit.component';
import { SignupComponent } from './core/signup/signup.component';

const appRoutes: Routes = [
  {path: '', component: VideosComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'videos', component: VideosComponent},
  {path: 'add', component: VideoEditComponent},
  {path: 'video/edit/:id', component: VideoEditComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    NavBarComponent,
    LoaderComponent,
    VideosComponent,
    VideoItemComponent,
    VideoEditComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    AuthHttpClient,
    NavBarService,
    LoaderService,
    CookieService,
    VideosService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
