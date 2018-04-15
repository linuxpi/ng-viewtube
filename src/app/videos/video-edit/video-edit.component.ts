import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavBarService} from '../../core/navbar/navbar.service';
import {NavBarState} from '../../core/navbar/navbar.state';
import {VideosService} from '../videos.service';
import {AuthenticationService} from '../../core/authentication/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Video} from '../video';
import {FormControl, FormGroup, Validators, FormBuilder, Form} from '@angular/forms';

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.css']
})
export class VideoEditComponent implements OnInit {

  loading: boolean = true;
  video: Video;
  videoFileName: string;
  videoFile: string;
  videoId: number;

  thumbnailUpdated: boolean = false;
  videoUpdated: boolean = false;

  submitted: boolean = false;

  videoForm: FormGroup;

  @ViewChild('thumbnailInput') thumbnailInput = ElementRef;
  @ViewChild('thumbnailDisplay') thumbnailDisplay;


  constructor(
    private service: VideosService,
    private authenticationService: AuthenticationService,
    private navbarService: NavBarService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {

    this.navbarService.updateState(<NavBarState>{show: true, showHome: true, showLogout: true, showLogin: true, showUpload: true});
    if (!this.authenticationService.isUserDataAvailable()) {
      this.router.navigate(['/login'])
    }

    this.videoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      is_private: false,
      thumbnail: ['', Validators.required],
    });

    this.videoId = this.route.params['value'].id;

    if (this.videoId) {
      this.service.getVideo(this.videoId).subscribe(
        video => {
          this.thumbnailDisplay.nativeElement.src = video.thumbnail;
          this.videoForm.setValue({
            title: video.title,
            description: video.description,
            is_private: video.is_private,
            thumbnail: video.thumbnail,
          });

          this.videoFile = video.file;

          this.videoFileName = video.file.split('/').pop();

          this.loading = false;
        },
        err => {
          this.loading = false;
        }
      );

    }

    this.videoForm.controls['title'].valueChanges.subscribe(data =>{
      this.submitted = false;
    });

    this.videoForm.controls['description'].valueChanges.subscribe(data =>{
      this.submitted = false;
    });

  }

  ngOnInit() {
  }

  onFileChange(event, isVideo) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (isVideo) {
          this.videoFile = reader.result.split(',')[1];
          this.videoUpdated = true;
        } else {
          this.thumbnailDisplay.nativeElement.src = reader.result;
          this.videoForm.patchValue({
            thumbnail: reader.result.split(',')[1]
          });
          this.thumbnailUpdated = true;
          this.videoForm.markAsTouched();
        }
      };
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.videoForm.status == "VALID") {
      let modal = this.videoForm.value;

      if (!this.thumbnailUpdated) {
        delete modal.thumbnail;
      }

      if (this.videoUpdated) {
        modal.file = this.videoFile;
      }
      let observable;
      if (this.videoId) {
        modal.id = this.route.params['value'].id;
        observable = this.service.patchVideo(modal);
      } else {
        observable = this.service.postVideo(modal);
      }

      observable.subscribe(data => {
        this.router.navigate(['/videos']);
      }, err=> {
        alert("error while saving data!")
      });
    }
  }

}
