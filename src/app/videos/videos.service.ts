import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AuthHttpClient } from '../_guards/authenticated_http';
import { Video } from './video';

import { environment } from '../../environments/environment';
const API_ROOT = environment.api_root;

@Injectable()
export class VideosService {
  constructor (
    private authHttpClient: AuthHttpClient
  ) {
    this.authHttpClient = authHttpClient;
  }

  getVideos() {
    let url = API_ROOT + 'videos/videos/';
    return this.authHttpClient.get(url);
  }

  getVideo(id: number) {
    let url = API_ROOT + 'videos/videos/' + id + '/';
    return this.authHttpClient.get(url);
  }

  patchVideo(video: Video) {
    let url = API_ROOT + 'videos/videos/' + video.id + '/';
    return this.authHttpClient.patch(url, video);
  }

  postVideo(video: Video) {
    let url = API_ROOT + 'videos/videos/';
    return this.authHttpClient.post(url, video);
  }
}
