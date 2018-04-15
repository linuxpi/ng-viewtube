import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AuthHttpClient } from '../_guards/authenticated_http';
import { Video } from './video';

import { environment } from '../../environments/environment';
const API_ROOT = environment.api_root;

@Injectable()
export class VideosService {
  constructor (
    private http: Http,
    private authHttpClient: AuthHttpClient
  ) {
    this.authHttpClient = authHttpClient;
  }

  getVideos() {
    let url = API_ROOT + 'videos/videos/';
    return this.authHttpClient.get(url).map(data => data.json());
  }

  getVideo(id: number) {
    let url = API_ROOT + 'videos/videos/' + id + '/';
    return this.authHttpClient.get(url).map(data => data.json())
  }

  putVideo(video: Video) {
    let url = API_ROOT + 'videos/videos/' + video.id + '/';
    return this.authHttpClient.put(url, video).map(data => data.json());
  }

  postVideo(video: Video) {
    let url = API_ROOT + 'videos/videos/';
    return this.authHttpClient.post(url, video).map(data => data.json());
  }
}
