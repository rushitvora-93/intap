import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private router: Router, private toast: ToastrService, private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  onSubmit(data) {
    const addLinks = [
      { imageLink: './assets/social/whatsapp.png', title: "whatsapp" },
      { imageLink: './assets/social/facebookicon.png', title: "facebook"},
      { imageLink: './assets/social/mailicon.png', title: "mail"},
      { imageLink: './assets/social/insta.png', title: "instagram"},
      { imageLink: './assets/social/snapchat.png', title: "snapchat"},
      { imageLink: './assets/social/twitter.png', title: "twitter"},
      { imageLink: './assets/social/linkedin.png', title: "linkedin"},
      { imageLink: './assets/social/imessage.png', title: "imessage"},
      { imageLink: './assets/social/youtube.png', title: "youtube"},
      { imageLink: './assets/social/tiktoknew.png', title: "tiktok"},
      { imageLink: './assets/social/soundcloudnew.png', title: "soundcloud"},
      { imageLink: './assets/social/spotify.png', title: "spotify"},
      { imageLink: './assets/social/applemusicicon.png', title: "applemusic"},
      { imageLink: './assets/social/cash.png', title: "cashapp"},
      { imageLink: './assets/social/safari.png', title: "safari"},
      { imageLink: './assets/social/customlink.png', title: "customLink"},
      { imageLink: './assets/social/venmo.png', title: "venmo"},
      { imageLink: './assets/social/twitch.png', title: "twitch"},
    ];

    this.authService.setLoader(true);
    const body = new URLSearchParams();
    body.set('username', data.username);
    body.set('email', data.email);
    body.set('password', data.password);
   

    for (let i = 0; i < addLinks.length; i++) {
      body.set('social[' + [i] + '][imageLink]', addLinks[i].imageLink);
      body.set('social[' + [i] + '][title]', addLinks[i].title);
   }
    this.authService.postData('register', body.toString()).subscribe(response => {
      this.authService.setLoader(false);
      if (response.data) {
        const res = response.data;
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.id);
        localStorage.setItem('email', res.email);
        localStorage.setItem('username', res.username);
        this.router.navigateByUrl('/user-home/' + res.username);
      }
    }, error => {
      this.authService.setLoader(false);
      this.toast.error(error);
    });
  }

}
