import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SettingsComponent } from './settings/settings.component';
import { UserComponent } from './user/user.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { FetchProfileComponent } from './fetch-profile/fetch-profile.component';
import { ForgotComponent } from './forgot/forgot.component';
import { OtpComponent } from './otp/otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CompatiblePhonesComponent } from './compatible-phones/compatible-phones.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { HttpGuard } from './guards/http.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [HttpGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
    // canActivate: [HttpGuard]
  },
  {
    path: 'sign-up',
    component: SignupComponent,
    data: { title: 'sign-up' },
    // canActivate: [HttpGuard]
  },
  {
    path: 'user-home/:username',
    component: UserHomeComponent,
    data: { title: 'user-home' },
    // canActivate: [AuthGuard]
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    data: { title: 'edit-profile' },
    // canActivate: [AuthGuard]
  }, 
  {
    path: 'settings',
    component: SettingsComponent,
    data: { title: 'edit-profile' },
    // canActivate: [AuthGuard]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    data: { title: 'edit-profile' },
    // canActivate: [AuthGuard]
  },
  {
  path: 'user/:username',
  component: UserComponent,
  data: { title: 'user' },
  // canActivate: [HttpGuard]
  },
  {
    path: 'main-home/:userId',
    component: MainHomeComponent,
    data: { title: 'user' },
    // canActivate: [HttpGuard]
  },
  {
    path: 'fetch-profile/:username',
    component: FetchProfileComponent,
    data: { title: 'fetchs-profile' },
    // canActivate: [HttpGuard]
  }, 
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
    // canActivate: [HttpGuard]
  },
  {
    path: 'forgot',
    component: ForgotComponent,
    // canActivate: [HttpGuard]
  }, 
  {
    path: 'otp',
    component: OtpComponent,
    // canActivate: [HttpGuard]
  }, 
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    // canActivate: [HttpGuard]
  },
  {
    path: 'compatible-phones',
    component: CompatiblePhonesComponent,
    // canActivate: [AuthGuard]
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
