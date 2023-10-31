import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { JwtModule } from '@auth0/angular-jwt';
import { UserHomeComponent } from './user-home/user-home.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SettingsComponent } from './settings/settings.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ApiLoaderComponent } from './api-loader/api-loader.component';
import { UserComponent } from './user/user.component';
import { ImageCropperModalComponent } from './edit-profile/image-cropper-modal/image-cropper-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainHomeComponent } from './main-home/main-home.component';
import { FetchProfileComponent } from './fetch-profile/fetch-profile.component';
import { NgxVcardModule } from 'ngx-vcard';
import { ForgotComponent } from './forgot/forgot.component';
import { OtpComponent } from './otp/otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CompatiblePhonesComponent } from './compatible-phones/compatible-phones.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    UserHomeComponent,
    EditProfileComponent,
    SettingsComponent,
    ChangePasswordComponent,
    ApiLoaderComponent,
    UserComponent,
    ImageCropperModalComponent,
    MainHomeComponent,
    FetchProfileComponent,
    ForgotComponent,
    OtpComponent,
    ResetPasswordComponent,
    CompatiblePhonesComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot({
      positionClass : 'toast-top-right',
      preventDuplicates : false
    }),
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule,
    NgxVcardModule,
    ImageCropperModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['https://tapin.me'],
        blacklistedRoutes: [
           'https://tapin.me/TapinBackend/public/api/login',
        ]
      }
      // config: {
      //     tokenGetter: tokenGetter,
      //     whitelistedDomains: ['18.191.52.3'],
      //     blacklistedRoutes: [
      //        'http://18.191.52.3/TapinBackend/public/api/login',
      //     ]
      // }
  }),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
