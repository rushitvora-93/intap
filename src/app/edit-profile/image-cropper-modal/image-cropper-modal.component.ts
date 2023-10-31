import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageTransform, ImageCroppedEvent, base64ToFile, Dimensions } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropper-modal',
  templateUrl: './image-cropper-modal.component.html',
  styleUrls: ['./image-cropper-modal.component.css']
})
export class ImageCropperModalComponent implements OnInit {
  @Input() imageBase64;
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    // console.log(event, base64ToFile(event.base64));
  }

  imageLoaded() {
    this.showCropper = true;
    // this.apiloader.setLoader(false);
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    // console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
    // this.apiloader.setLoader(false);
  }

  passBack() {
    this.activeModal.close(this.croppedImage);
  }

}
