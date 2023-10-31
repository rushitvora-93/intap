import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { VCardEncoding, VCardFormatter, VCard } from 'ngx-vcard';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  dataSource = [];
  username;
  fullName;
  userData;
  socialData;
  bio;
  tapinCount;
  getCount;
  userId;
  show = false;
  profile;
  public vCardEncoding: typeof VCardEncoding = VCardEncoding;
  public vCard: VCard = {};
  vCardString;
  profileImage = '';
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private toast: ToastrService) {

               }

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.url[1].path;
    this.getData();
    
  }

  getData() {
    
    this.authService.setLoader(true);
    this.authService.getData('find_user/' + this.username).subscribe(response => {
      this.authService.setLoader(false);
      console.log(response.user[0]);
      this.profile = response.user[0][0].profile;
      this.fullName =  response.user[0][0].name;
      this.userId = response.user[0][0].id;
      this.getCount = response.user[0][0].counter;
      if (response.user[0][0].bio != null) {
        this.bio =  response.user[0][0].bio;
      }
      this.getTapinCount();
      if (response.user[0][0].profile_image != null) {
        this.profileImage = 'https://tapin.me/TapinBackend/public/profile/' + response.user[0][0].profile_image;
     }
      if (response.user[0][0].profile == '1') {
      if (response.user[0][0].direct == 'Direct On') {
        for (let i = 0; i < response.data.length; i++) {
          if(i == 0) {
            if (response.data[i].link !== '') {
              if (response.data[i].title === 'applemusic') {
                response.data[i].SocialLink = 'https://itunes.apple.com/profile/' + response.data[i].link;
              }
  
              if (response.data[i].title === 'instagram') {
                response.data[i].SocialLink = 'https://www.instagram.com/' + response.data[i].link;
              }
  
              if (response.data[i].title === 'whatsapp') {
                response.data[i].SocialLink = 'https://api.whatsapp.com/send?phone=' + response.data[i].link;
              }
  
              if (response.data[i].title === 'snapchat') {
                response.data[i].SocialLink = 'https://www.snapchat.com/add/' + response.data[i].link;
  
              }
  
              if (response.data[i].title === 'facebook') {
                response.data[i].SocialLink = 'https://www.facebook.com/' + response.data[i].link;
              }
              if (response.data[i].title === 'mail') {
                response.data[i].SocialLink = 'mailto:' + response.data[i].link;
  
              }
              if (response.data[i].title === 'twitter') {
                response.data[i].SocialLink = 'https://twitter.com/' + response.data[i].link;
  
              }
              if (response.data[i].title === 'linkedin') {
                response.data[i].SocialLink = 'https://ca.linkedin.com/' + response.data[i].link;
  
              }
              if (response.data[i].title === 'imessage') {
                response.data[i].SocialLink = 'sms:' + response.data[i].link;
              }
  
  
              if (response.data[i].title === 'customLink') {
                response.data[i].SocialLink = 'http://' + response.data[i].link;
              }
  
              if (response.data[i].title === 'youtube') {
                response.data[i].SocialLink = 'https://www.youtube.com/c/' + response.data[i].link;
  
              }
              if (response.data[i].title === 'tiktok') {
                response.data[i].SocialLink = 'http://vt.tiktok.com/' + response.data[i].link;
  
              }
              if (response.data[i].title === 'soundcloud') {
                response.data[i].SocialLink = 'https://soundcloud.com/' + response.data[i].link;
              }
  
              if (response.data[i].title === 'spotify') {
                response.data[i].SocialLink = 'https://open.spotify.com/user/' + response.data[i].link;
  
              }
  
              if (response.data[i].title === 'venmo') {
                response.data[i].SocialLink = 'https://venmo.com/' + response.data[i].link;
              }
  
              if (response.data[i].title === 'cashapp') {
                response.data[i].SocialLink = 'https://cash.app/' + response.data[i].link;
              }
  
              if (response.data[i].title === 'safari') {
                response.data[i].SocialLink = 'http://' + response.data[i].link;
  
              }
  
              if (response.data[i].title === 'twitch') {
                response.data[i].SocialLink = 'https://www.twitch.tv/' + response.data[i].link;
  
              }
            }
            window.location.href = response.data[i].SocialLink
            // this.router.navigateByUrl(response.data[i].SocialLink);
          }
        }

      } else {
      this.show = true;
      if (response.user) {
        this.userData = response.user;
        this.socialData = response.data;
        this.downloadVcf();
        // const userProfileData = response.user;
        // this.username =  userProfileData[0][0].username;
        // if (userProfileData[0][0].bio != null) {
        //   this.bio =  userProfileData[0][0].bio;
        // }
       }
      const data = [];
      if (response.data) {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].link !== '') {
            if (response.data[i].title === 'applemusic') {
              response.data[i].SocialLink = 'https://itunes.apple.com/profile/' + response.data[i].link;
            }

            if (response.data[i].title === 'instagram') {
              response.data[i].SocialLink = 'https://www.instagram.com/' + response.data[i].link;
            }

            if (response.data[i].title === 'whatsapp') {
              response.data[i].SocialLink = 'https://api.whatsapp.com/send?phone=' + response.data[i].link;
            }

            if (response.data[i].title === 'snapchat') {
              response.data[i].SocialLink = 'https://www.snapchat.com/add/' + response.data[i].link;

            }

            if (response.data[i].title === 'facebook') {
              response.data[i].SocialLink = 'https://www.facebook.com/' + response.data[i].link;
            }
            if (response.data[i].title === 'mail') {
              response.data[i].SocialLink = 'mailto:' + response.data[i].link;

            }
            if (response.data[i].title === 'twitter') {
              response.data[i].SocialLink = 'https://twitter.com/' + response.data[i].link;

            }
            if (response.data[i].title === 'linkedin') {
              response.data[i].SocialLink = 'https://ca.linkedin.com/' + response.data[i].link;

            }
            if (response.data[i].title === 'imessage') {
              response.data[i].SocialLink = 'sms:' + response.data[i].link;
            }


            if (response.data[i].title === 'customLink') {
              response.data[i].SocialLink = 'http://' + response.data[i].link;
            }

            if (response.data[i].title === 'youtube') {
              response.data[i].SocialLink = 'https://www.youtube.com/c/' + response.data[i].link;

            }
            if (response.data[i].title === 'tiktok') {
              response.data[i].SocialLink = 'http://vt.tiktok.com/' + response.data[i].link;

            }
            if (response.data[i].title === 'soundcloud') {
              response.data[i].SocialLink = 'https://soundcloud.com/' + response.data[i].link;
            }

            if (response.data[i].title === 'spotify') {
              response.data[i].SocialLink = 'https://open.spotify.com/user/' + response.data[i].link;

            }

            if (response.data[i].title === 'venmo') {
              response.data[i].SocialLink = 'https://venmo.com/' + response.data[i].link;
            }

            if (response.data[i].title === 'cashapp') {
              response.data[i].SocialLink = 'https://cash.app/' + response.data[i].link;
            }

            if (response.data[i].title === 'safari') {
              response.data[i].SocialLink = 'http://' + response.data[i].link;

            }

            if (response.data[i].title === 'twitch') {
              response.data[i].SocialLink = 'https://www.twitch.tv/' + response.data[i].link;

            }
            data.push(response.data[i]);
          }

          response.data[i].disableLink = false;
        }

        this.dataSource = data;


       }
      }
     } else {
      this.show = true;
     }
    }, error => {
      this.authService.setLoader(false);
      this.router.navigateByUrl('/page-not-found');
      // this.toast.error(error);
    });
  
  }

  getTapinCount() {
    console.log(this.userId);
    this.tapinCount = this.getCount + 1;
    const body = new URLSearchParams();
    body.set('countTapin', this.tapinCount);
    this.authService.postData('tapinCount/' + this.userId, body.toString()).subscribe(response => {
       console.log(response);
    }, error => {
      // this.authService.setLoader(false);
      // this.router.navigateByUrl('/page-not-found');
       this.toast.error(error);
    });
  }

  downloadVcf() {
    let contactNo;
    if (this.socialData) {
      for (let i = 0; i < this.socialData.length; i++) {
        if (this.socialData[i].link !== '') {
          if (this.socialData[i].title === 'whatsapp') {
            contactNo = this.socialData[i].link;
          }
        }
      }
    }
    const getUrl = "http://www.tapin.me/" + this.router.url;
    this.vCard = { 
                  prodid: '//Apple Inc.//iPhone OS 13.1.2//EN',
                  name: { firstNames: this.userData[0][0].username, lastNames: '' },
                  email: [this.userData[0][0].email],
                  telephone: [contactNo],
                  url: getUrl,
                  organization: this.userData[0][0].bio,
                  note: 'To save this contact to your phone on iOS 13, hard press on the profile picture!'
                 };
    this.vCardString = VCardFormatter.getVCardAsString(this.vCard);
  }

}
