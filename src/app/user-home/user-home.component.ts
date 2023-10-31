import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})

export class UserHomeComponent implements OnInit {
 
  addUsername;
  dataSource = [];
  fullName;
  countTapin;
  // mobileView = false;
  // simple : boolean;

  // @HostListener("window:resize", [])

  // onResize() {
  //   var width = window.innerWidth;
  //   if (width < 600) {
  //     this.mobileView = true;
  //     this.simple = false;
  //   } else {
  //     this.mobileView = false;
  //     this.simple = true;
  //   }
  // }
  // dataSource = [
  //   { name: './assets/social/mailicon.png', title: "Mail", id: 3 }
  // ];
  images = [
    { imageLink: "./assets/social/whatsapp.png", title: "whatsapp" },
    { imageLink: "./assets/social/facebookicon.png", title: "facebook" },
    { imageLink: "./assets/social/mailicon.png", title: "mail" },
    { imageLink: "./assets/social/contacts.png", title: "contact" },
    { imageLink: "./assets/social/insta.png", title: "Whatsapp" },
    // {name : "https://poplme.co/templates/assets/frontend/images/icons/plusicon.png", title: "Add Link"},
  ]

  addLinks = [
    { imageLink: './assets/social/whatsapp.png', title: "whatsapp", link: '', disableLink: true },
    { imageLink: './assets/social/facebookicon.png', title: "facebook", link: '', disableLink: true },
    { imageLink: './assets/social/mailicon.png', title: "mail", link: '', disableLink: true },
    { imageLink: './assets/social/insta.png', title: "instagram", link: '', disableLink: true },
    { imageLink: './assets/social/snapchat.png', title: "snapchat", link: '', disableLink: true },
    { imageLink: './assets/social/twitter.png', title: "twitter", link: '', disableLink: true },
    { imageLink: './assets/social/linkedin.png', title: "linkedin", link: '', disableLink: true },
    { imageLink: './assets/social/imessage.png', title: "imessage", link: '', disableLink: true },
    { imageLink: './assets/social/youtube.png', title: "youtube", link: '', disableLink: true },
    { imageLink: './assets/social/tiktoknew.png', title: "tiktok", link: '', disableLink: true },
    { imageLink: './assets/social/soundcloudnew.png', title: "soundcloud", link: '', disableLink: true },
    { imageLink: './assets/social/spotify.png', title: "spotify", link: '', disableLink: true },
    { imageLink: './assets/social/applemusicicon.png', title: "applemusic", link: '', disableLink: true },
    { imageLink: './assets/social/cash.png', title: "cashapp", link: '', disableLink: true },
    { imageLink: './assets/social/safari.png', title: "safari", link: '', disableLink: true },
    { imageLink: './assets/social/venmo.png', title: "venmo", link: '', disableLink: true },
    { imageLink: './assets/social/customlink.png', title: "customLink", link: '', disableLink: true },
    { imageLink: './assets/social/twitch.png', title: "twitch", link: '', disableLink: true },
  ]
  safariWindow;
  userName;
  pop = false;
  desc;
  show = false;
  qrCode = false;
  appear = false;
  notDraggable = true;
  Draggable = false;
  toggle = true;
  seen = true;
  detect = false;
  status1 = 'Enable';
  caption = 'Direct Off';
  status = 'Enable';
  name = 'Edit';
  isDisabled = false;
  linkDisabled = false;
  change = false;
  sourceLink;
  placeholder;
  linkDescription;
  title;
  allLinks = [];
  submitAllLinks = [];
  userId;
  url;
  isDisabledLink = false;
  profileImage = '';

  @ViewChild('searchInput') searchInput: ElementRef;


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private toast: ToastrService) { }

  ngOnInit(): void {
    // if(window.screen.width === 360){
    //   this.mobileView = true;
    // }
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.userName = localStorage.getItem('username');
      this.getData();
      
    } else {
      const username = this.activatedRoute.snapshot.url[1].path;
      this.router.navigateByUrl('/user/' + username);
    }

    // this.authService.getUserData().subscribe(value => {
    //   this.userName = value.username;
    //   if (value.bio !== 'null') {
    //     this.desc = value.bio;
    //   }
    // });

  }

  added(sourceLink, titleName) {

    const data = [];
    this.dataSource.push({ imageLink: sourceLink, title: titleName.toLowerCase(), link: this.addUsername, disableLink: false })
    this.saveSocialSequence();
    this.pop = false;
  }

  popUp(event) {

    if (event === 'whatsapp') {
      this.sourceLink = './assets/social/whatsapp.png',
        this.placeholder = 'WhatsApp Number';
      this.title = 'whatsApp';
      this.linkDescription = 'Open WhatsApp and go to settings. Tap your profile at the top and add your phone number here. Make sure to include your country code!'
    }
    else if (event === 'facebook') {
      this.sourceLink = './assets/social/facebookicon.png',
        this.placeholder = 'Facebook Profile link';
      this.title = 'facebook';
      this.linkDescription = 'Go to facebook.com and open your Facebook profile or page. Then copy and paste the url link here.'
    }
    else if (event === 'mail') {
      this.sourceLink = './assets/social/mailicon.png',
        this.placeholder = 'Email';
      this.title = 'mail';
      this.linkDescription = 'Input your email address. This email can be the same or different from the one used for your account signup.'
    }
    else if (event === 'contacts') {
      this.sourceLink = './assets/social/contacts.png',
        this.placeholder = 'FaceBook Id';
      this.title = 'contacts';
      this.linkDescription = 'Open WhatsApp and go to settings. Tap your profile at the top and add your phone number here. Make sure to include your country code!'
    }
    else if (event == 'instagram') {
      this.sourceLink = './assets/social/insta.png',
        this.placeholder = 'Instagram username';
      this.title = 'instagram';
      this.linkDescription = 'Open the Instagram app and go to your profile. Your instagram username will be at the top of your screen.'
    }
    else if (event == 'snapchat') {
      this.sourceLink = './assets/social/snapchat.png',
        this.placeholder = 'Snapchat username';
      this.title = 'snapchat';
      this.linkDescription = 'Open Snapchat and tap your profile picture in the top left corner. Your snapchat username will be below your Snapchat name.'
    }
    else if (event == 'twitter') {
      this.sourceLink = './assets/social/twitter.png',
        this.placeholder = 'Twitter username';
      this.title = 'twitter';
      this.linkDescription = 'Open the Twitter app and tap your profile picture in the top left corner. Your twitter username will be in grey with an @ sign.'
    }
    else if (event == 'linkedin') {
      this.sourceLink = './assets/social/linkedin.png',
        this.placeholder = 'LinkedIn profile link';
      this.title = 'linkedin';
      this.linkDescription = 'Go to your Linkedin profile and scroll down to the “contact” section. Find your LinkedIn profile link in this section and copy/paste here!'
    }
    else if (event == 'imessage') {
      this.sourceLink = './assets/social/imessage.png',
        this.placeholder = 'Phone number';
      this.title = 'imessage';
      this.linkDescription = 'Input your phone number with your country code (Example +1 for USA).'
    }
    else if (event == 'youtube') {
      this.sourceLink = './assets/social/youtube.png',
        this.placeholder = 'Youtube user/channel link';
      this.title = 'youtube';
      this.linkDescription = 'Open the Youtube app and go to your channel. Then tap the three dots in the top right corner and tap share. Copy/paste the link here.'
    }
    else if (event == 'tiktok') {
      this.sourceLink = './assets/social/tiktoknew.png',
        this.placeholder = 'TikTok username';
      this.title = 'tiktok';
      this.linkDescription = 'Open TikTok and go to the “me” tab. Your TikTok username is under your profile picture.'
    }
    else if (event == 'soundcloud') {
      this.sourceLink = './assets/social/soundcloudnew.png',
        this.placeholder = 'Soundcloud username';
      this.title = 'soundcloud';
      this.linkDescription = 'Open the Soundcloud app and go to your profile. Copy and paste your username here.'
    }
    else if (event == 'spotify') {
      this.sourceLink = './assets/social/spotify.png',
        this.placeholder = 'Link to Spotify';
      this.title = 'spotify';
      this.linkDescription = 'Pick your favorite playlist/track/album and tap the three dots in the top right corner. Tap share and copy/paste the link here.'
    }
    else if (event == 'applemusic') {
      this.sourceLink = './assets/social/applemusicicon.png',
        this.placeholder = 'Link to Apple Music';
      this.title = 'applemusic';
      this.linkDescription = 'Pick your favorite playlist/track/album and tap the three dots in the top right corner. Tap share and copy/paste link here.'
    }
    else if (event == 'cashapp') {
      this.sourceLink = './assets/social/cash.png',
        this.placeholder = 'Cash App username';
      this.title = 'cashapp';
      this.linkDescription = 'Open CashApp and tap the profile icon in the top right corner. Your CashApp username will be in grey with a $.'
    }
    else if (event == 'safari') {
      this.sourceLink = './assets/social/safari.png',
        this.placeholder = 'Website link';
      this.title = 'safari';
      this.linkDescription = 'Open your desired website and copy/paste the url here.'
    }
    else if (event == 'customLink') {
      this.sourceLink = './assets/social/customlink.png',
        this.placeholder = 'Custom link';
      this.title = 'customLink';
      this.linkDescription = 'Open your desired custom link and copy/paste the url here. This link can be a location, Paypal link, second Instagram or anything else you can imagine!'
    }
    else if (event == 'venmo') {
      this.sourceLink = './assets/social/venmo.png',
        this.placeholder = 'venmo username';
      this.title = 'venmo';
      this.linkDescription = 'Open the Venmo app and tap the three lines in the top left corner. Your username will be in grey with an @ sign.'
    }

    this.show = false;
    this.appear = false;
    this.pop = true;
    if (window && window.pageYOffset) {
      window.scroll(0, 0);
    }
  }

  editLinks() {
    this.notDraggable = false;
    this.Draggable = true;
    this.show = true;
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';

    if (this.name == 'Edit') {
      this.name = 'Save';
      this.isDisabled = true;
    }
    else {
      this.isDisabled = false;
      this.notDraggable = true;
      this.Draggable = false;
      this.show = false;
      this.name = 'Edit';
      this.saveSocialSequence();
    }
  }

  // delete(id) {
  //   this.images.splice(id, 1);
  // }

  delete(id) {

    if (confirm("Are you sure you want to delete?")) {
      this.authService.setLoader(true);
      this.authService.postData('users/updateSocial/' + id).subscribe(response => {
        if (response.status === 200) {
          this.authService.setLoader(false);
          this.getData();
          this.toast.success('Deleted Successfully!.');
        }
      }, error => {
        this.authService.setLoader(false);
        this.toast.error(error);
      });
    }
  }

  addLink() {
    console.log(this.addLinks);
    let array = [];
    this.dataSource.forEach((item2) => {
      this.addLinks = this.addLinks.filter((item1) => {
        if (JSON.stringify(item1.title) !== JSON.stringify(item2.title)) {
          return JSON.stringify(item2);
        }
      });
    });

    this.allLinks = this.dataSource.concat(this.addLinks);
    this.appear = true;
  }

  directoff() {
    this.seen = !this.seen;
    this.status1 = this.seen ? 'Enable' : 'Disable';
    const username = localStorage.getItem('username');
    const dataAll = [];

    if (this.caption == 'Direct Off') {
      this.caption = 'Direct On';
      const body = new URLSearchParams();
      body.set('direct', this.caption);
      this.authService.postData('updateDirect/' + username, body.toString()).subscribe(response => {
        if (response.data) {
           // console.log(response.data);
         }
       });
    }
    else {
      this.caption = 'Direct Off';
      const body = new URLSearchParams();
      body.set('direct', this.caption);
      this.authService.postData('updateDirect/' + username, body.toString()).subscribe(response => {
       if (response.data) {
          // console.log(response.data);
        }
      });
      // this.directOffFun();
    }
  }


  addnewLink() {
    console.log(this.addLinks);
    this.dataSource.forEach((item2) => {
      this.addLinks = this.addLinks.filter((item1) => {
        if (JSON.stringify(item1.title) !== JSON.stringify(item2.title)) {
          return JSON.stringify(item2);
        }
      });
    });

    this.allLinks = this.dataSource.concat(this.addLinks);

    this.appear = true;
  }

  editProfile() {
    this.router.navigateByUrl('/edit-profile');
  }

  closeLink() {
    this.appear = false;
    if (this.show == true) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  closeLinkUsername() {
    this.pop = false;
    if (this.show == true) {
      this.show = true;
    }
    else {
      this.show = false;
    }
  }

  saveLink() {
    this.isDisabled = false;
    this.notDraggable = true;
    this.Draggable = false;
    this.show = false;
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
    this.name = 'Edit'
  }

  drop(event: CdkDragDrop<any[]>) {
    // if (event.previousContainer === event.container) {
    moveItemInArray(this.dataSource, event.previousIndex, event.currentIndex);

    // }
    // else {
    //   transferArrayItem(event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex);
    // }
  }


  //   moveItemInArray(this.images, event.previousIndex, event.currentIndex)
  // }

  clear() {
    this.searchInput.nativeElement.value = '';
  }

  getData() {
    const userId = localStorage.getItem('userId');
    this.authService.setLoader(true);
    this.authService.getData('users/getSequence/' + userId).subscribe(response => {
      this.authService.setLoader(false);
      console.log(response.user);
      if (response.user) {
        const userProfileData = response.user;
        this.fullName = userProfileData[0].name;
        this.countTapin = userProfileData[0].counter;
        if (userProfileData[0].bio !== 'null') {
          this.desc = userProfileData[0].bio;
        }
        if (userProfileData[0].profile_image != null) {
           this.profileImage = 'https://tapin.me/TapinBackend/public/profile/' + userProfileData[0].profile_image;
        }
        if (userProfileData[0].direct != null) {
          if(userProfileData[0].direct === 'Direct On') {
            this.seen = false;
          } else {
            this.seen = true;
          }
          this.caption =  userProfileData[0].direct;
        }
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
    }, error => {
      this.authService.setLoader(false);
      this.toast.error(error);
    });
  }

  saveSocialSequence() {
    const body = new URLSearchParams();


    this.dataSource.forEach((item2) => {
      this.addLinks = this.addLinks.filter((item1) => {
        if (JSON.stringify(item1.title) !== JSON.stringify(item2.title)) {
          return JSON.stringify(item2);
        }
      });
    });

    this.submitAllLinks = this.dataSource.concat(this.addLinks);
    if (this.dataSource.length > 0) {
      for (let i = 0; i < this.submitAllLinks.length; i++) {
        body.set('social[' + [i] + '][imageLink]', this.submitAllLinks[i].imageLink);
        body.set('social[' + [i] + '][title]', this.submitAllLinks[i].title);
        body.set('social[' + [i] + '][link]', this.submitAllLinks[i].link);
      }

    }
    const userId = localStorage.getItem('userId');
    this.authService.setLoader(true);
    this.authService.postData('users/socialSequence/' + userId, body.toString()).subscribe(response => {
      this.authService.setLoader(false);
      if (response.status === 200) {
        this.getData();
        this.isDisabled = false;
        this.notDraggable = true;
        this.Draggable = false;
        this.show = false;
        this.toggle = !this.toggle;
        this.name = 'Edit';
      }
    }, error => {
      this.authService.setLoader(false);
      this.toast.error(error);
    });
  }

  qrCodeEnable() {
    this.qrCode = true;
  }

  closeLinkQr() {
    if (this.qrCode == true) {
      this.qrCode = false;
    } else {
      this.qrCode = true;
    }
  }

  onClickWallet() {
    const userId = localStorage.getItem('userId');

    this.authService.setLoader(true);
    this.authService.getData('pkGenerateQ/' + userId).subscribe(response => {
      this.authService.setLoader(false);
      // console.log(response);
      if (response.status === 200) {
        const link = document.createElement('a');
       // link.download = name;
        link.href = response.data;
        link.click();
        // var url = response.data;
        // var elem = document.createElement('a');
        // elem.href = url;
        // elem.target = 'hiddenIframe';
        // elem.click();
        // const windowReference = window.open();
        // windowReference.location = response.data;
        // this.safariWindow = window.open();
        // this.safariWindow.location.href = response.data;
        // window.open(response.data,'_blank');
      }
    }, error => {
      this.authService.setLoader(false);
      this.toast.error(error);
    });
  }
}
