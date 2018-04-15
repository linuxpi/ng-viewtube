import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {RouterModule, Routes} from '@angular/router';

import { FormsModule } from '@angular/forms';

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
import {HttpModule} from '@angular/http';
import {CookieService} from 'ngx-cookie-service';
import { VideosService } from './videos/videos.service';
import { VideosComponent } from './videos/videos.component';
import { VideoItemComponent } from './videos/video-item/video-item.component';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'videos', component: VideosComponent},
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
    VideoItemComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule
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
