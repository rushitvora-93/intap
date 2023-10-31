import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModalComponent } from './image-cropper-modal/image-cropper-modal.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  updateForm: FormGroup;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedImage1: any = '';
  selectedImage: any = '';
  logoImage;
  selectedPic: any = '';
  base64Image: any;
  cropImg;
  username;
  chkToggle:boolean = false;
  instagram;
  whatsapp;
  mail;
  facebook;
  snapchat;
  youtube;
  twitter;
  linkedin;
  imessage;
  customLink;
  twitch;
  tiktok;
  soundcloud;
  spotify;
  applemusic;
  venmo;
  cashapp;
  safari;

  @ViewChild('searchInput') searchInput:ElementRef;

  constructor(private router: Router,
    private modalService: NgbModal,
    private toast: ToastrService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {

    this.username = localStorage.getItem('username');
    this.logoImage = 'assets/images/users.jpg';
  }

  ngOnInit(): void {
    this.getData();
    this.updateForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      bio: [''],
      instagram: [''],
      whatsapp: [''],
      snapchat: [''],
      facebook: [''],
      mail: [''],
      twitter: [''],
      linkedin: [''],
      imessage: [''],
      customLink: [''],
      youtube: [''],
      tiktok: [''],
      soundcloud: [''],
      spotify: [''],
      applemusic: [''],
      venmo: [''],
      cashapp: [''],
      safari: [''],
      twitch: [''],
      logo: ['']
    });
  }

  // fileChangeEvent(event: any) {

  //   if (event) {
  //     this.imageChangedEvent = event;
  //     document.getElementById('openModalButton').click();
  //   }
  // }


  fileChangeEvent(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
    // reader.readAsDataURL(file);
    // reader.onload = () => {
    //   this.selectedPic = reader.result;
    //   this.cropImg = this.dataURLtoFile(this.selectedPic, 'logo');
    // //  const modalRef = this.modalService.open(ImageCropperModalComponent, { centered: true });
    // //   modalRef.componentInstance.imageBase64 = reader.result;
    // //   modalRef.result.then((result) => {
    // //     if (result) {
    // //       this.selectedPic = result;
    // //       this.cropImg = this.dataURLtoFile(this.selectedPic, 'logo');

    // //     }
    // //   });
    // };

  }

  handleReaderLoaded(e) {
    this.selectedPic = 'data:image/jpeg;base64,' + btoa(e.target.result);
    this.cropImg = this.dataURLtoFile(this.selectedPic, 'logo');

  }

  onSelect(base64Img) {
    const base64 = base64Img;
    const arrayBufferFromBase64 = this.convertDataURIToBinary(base64);
    const imagemAsFile = new File([arrayBufferFromBase64], 'Nome da Imagem', { type: 'image/png' });
    // this.files.push(imagemAsFile);
  }

  convertDataURIToBinary(dataURI: string) {
    const BASE64_MARKER = ';base64,';
    const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    const base64 = dataURI.substring(base64Index);
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }

  getData() {
    const userId = localStorage.getItem('userId');
    this.authService.setLoader(true);
    this.authService.getData('users/' + userId).subscribe(response => {
      this.authService.setLoader(false);
      if (response.data) {
        const userData = response.data;
        this.updateForm.patchValue({
          name: userData.name,
          bio: userData.bio
        });

        if (userData.profile === '1') {
          this.chkToggle = true;
        }

        if (userData.profile_image != null) {
          this.selectedPic = 'https://tapin.me/TapinBackend/public/profile/' + userData.profile_image;
        }

        for (let i = 0; i < userData.social.length; i++) {

          if (userData.social[i].title === 'applemusic') {
            this.updateForm.patchValue({
              applemusic: userData.social[i].link
            });
          }

          if (userData.social[i].title === 'instagram') {
            this.updateForm.patchValue({
              instagram: userData.social[i].link
            });
          }

          if (userData.social[i].title === 'whatsapp') {
            this.updateForm.patchValue({
              whatsapp: userData.social[i].link
            });
          }

          if (userData.social[i].title === 'snapchat') {
            this.updateForm.patchValue({
              snapchat: userData.social[i].link
            });
          }

          if (userData.social[i].title === 'facebook') {
            this.updateForm.patchValue({
              facebook: userData.social[i].link
            });
          }
          if (userData.social[i].title === 'mail') {
            this.updateForm.patchValue({
              mail: userData.social[i].link
            });
          }
          if (userData.social[i].title === 'twitter') {
            this.updateForm.patchValue({
              twitter: userData.social[i].link
            });
          }
          if (userData.social[i].title === 'linkedin') {
            this.updateForm.patchValue({
              linkedin: userData.social[i].link
            });
          }
          if (userData.social[i].title === 'imessage') {
            this.updateForm.patchValue({
              imessage: userData.social[i].link
            });
          }


          if (userData.social[i].title === 'customLink') {
            this.updateForm.patchValue({
              customLink: userData.social[i].link
            });
          }

          if (userData.social[i].title === 'youtube') {
            this.updateForm.patchValue({
              youtube: userData.social[i].link
            });
          }
          if (userData.social[i].title === 'tiktok') {
            this.updateForm.patchValue({
              tiktok: userData.social[i].link
            });
          }
          if (userData.social[i].title === 'soundcloud') {
            this.updateForm.patchValue({
              soundcloud: userData.social[i].link
            });
          }
          if (userData.social[i].title === 'spotify') {
            this.updateForm.patchValue({
              spotify: userData.social[i].link
            });
          }

          if (userData.social[i].title === 'venmo') {
            this.updateForm.patchValue({
              venmo: userData.social[i].link
            });
          }

          if (userData.social[i].title === 'cashapp') {
            this.updateForm.patchValue({
              cashapp: userData.social[i].link
            });
          }

          if (userData.social[i].title === 'safari') {
            this.updateForm.patchValue({
              safari: userData.social[i].link
            });
          }

          if (userData.social[i].title === 'twitch') {
            this.updateForm.patchValue({
              twitch: userData.social[i].link
            });
          }
        }
      }
    }, error => {
      this.authService.setLoader(false);
      this.toast.error(error);
    });
  }


  onSubmit(data) {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
     this.authService.setLoader(true);
    // if (this.selectedImage === '') {
    //   const logoImg = this.logoImage;
    //   this.getBase64ImageFromURL(logoImg).subscribe(base64data => {
    //     // this is the image as dataUrl
    //     this.base64Image = 'data:image/jpg;base64,' + base64data;
    //     const crop = this.dataURLtoFile(this.base64Image, 'logo');
    //     data.logo = crop;
    //     // formData.logo = crop;
    //   });
    // } else {
    //   data.logo = this.cropImg;
    //   // formData.logo = this.selectedImage;
    // }

    const addAllLinks = [
      { title: "whatsapp", link: this.whatsapp },
      { title: "facebook", link: this.facebook },
      { title: "mail", link: this.mail },
      { title: "instagram", link: this.instagram },
      { title: "snapchat", link: this.snapchat },
      { title: "twitter", link: this.twitter },
      { title: "linkedin", link: this.linkedin },
      { title: "imessage", link: this.imessage },
      { title: "youtube", link: this.youtube },
      { title: "tiktok", link: this.tiktok },
      { title: "soundcloud", link: this.soundcloud },
      { title: "spotify", link: this.spotify },
      { title: "applemusic", link: this.applemusic },
      { title: "cashapp", link: this.cashapp },
      { title: "safari", link: this.safari },
      { title: "customLink", link: this.customLink },
      { title: "venmo", link: this.venmo },
      { title: "twitch", link: this.twitch },
    ];

    const body = new URLSearchParams();

    if (this.cropImg) {
      body.set('profile_image', this.selectedPic);
    } else {
      body.set('profile_image', '');
    }

    if (this.chkToggle === true) {
      body.set('profile', '1');
    } else {
      body.set('profile', '0');
    }
    body.set('name', data.name);
    body.set('bio', data.bio);
    for (let i = 0; i < addAllLinks.length; i++) {
      body.set('social[' + [i] + '][link]', addAllLinks[i].link);
      body.set('social[' + [i] + '][title]', addAllLinks[i].title);
    }

    //const dataUpdate = this.authService.setData(data);
    this.authService.postData('users/' + userId, body.toString()).subscribe(response => {
      this.authService.setLoader(false);
      if (response.data) {

        this.authService.setUserData({ 'name': response.data.name, 'bio': response.data.bio });
        const res = response.data;
        this.router.navigateByUrl('/user-home/' + username);
      }
    }, error => {
      this.authService.setLoader(false);
      this.toast.error(error);
    });
  }


  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  onCloseDialog() {
    const crop = this.dataURLtoFile(this.croppedImage, 'logo');
    this.selectedImage = crop;
    this.croppedImage1 = this.croppedImage;
  }


  dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  dataURItoBlob(dataURI) {
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/png'
    });
  }


  getBase64ImageFromURL(url: string) {
    return new Observable((observer: Observer<string>) => {
      // create an image object
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
        // This will call another method that will create image from url
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    // We create a HTML canvas object that will create a 2d image
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    // This will draw image
    ctx.drawImage(img, 0, 0);
    // Convert the drawn image to Data URL
    const dataURL = canvas.toDataURL('image/png');
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }

  settings() {
    this.router.navigateByUrl('/settings');
  }

  onChange(e) {
    this.chkToggle = e.target.checked;
   }

  
}
