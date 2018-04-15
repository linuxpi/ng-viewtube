import { Component, OnInit } from '@angular/core';
import {VideosService} from './videos.service';
import {Video} from './video';
import {AuthenticationService} from '../core/authentication/authentication.service';
import {Router} from '@angular/router';
import {NavBarService} from '../core/navbar/navbar.service';
import {NavBarState} from '../core/navbar/navbar.state';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  videos: Video[];
  topVideo: Video;
  playingVideo: Video;
  loading: boolean = true;
  showPlayer: boolean = true;

  constructor(
    private service: VideosService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private navbarService: NavBarService
  ) {
    this.navbarService.updateState(<NavBarState>{show: true, showHome: false, showLogout: true});
    if (!this.authenticationService.isUserDataAvailable()) {
      this.router.navigate(['/login'])
    }

    this.service.getVideos().subscribe(
      videos => {
        if (videos.length > 0) {
          this.topVideo = videos[0]
        }
        this.videos = videos.splice(1);
        this.loading = false;
      }, err => {
        this.loading = false;
      }
    )
  }

  ngOnInit() { }

  playVideo(video: Video): void {
    this.showPlayer = true;
    this.playingVideo = video;
  }

  closePlayer(): void{
    this.showPlayer = false;
    this.playingVideo = undefined;
  }

}