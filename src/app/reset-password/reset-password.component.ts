import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  changePassForm: FormGroup;
  passwordFormErrors: any;
  emailId;
  constructor(private router: Router, private toast: ToastrService, private authService: AuthService, private formBuilder: FormBuilder) { 
    
    this.authService.getEmail().subscribe(val => {
      this.emailId = val;
     });

    this.passwordFormErrors = {
      otp: {},
    };
  }

  ngOnInit(): void {
    this.changePassForm = this.formBuilder.group({
      newpassword: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]],
    });

    this.changePassForm.valueChanges.subscribe(() => {
      this.onForgotFormValuesChanged();
    });
  }

  onSubmit(data) {
    const username = localStorage.getItem('username');
    this.authService.setEmail(this.emailId);
    this.authService.setLoader(true);
    const body = new URLSearchParams();
    body.set('email', this.emailId);
    body.set('password', data.newpassword);
    body.set('confirm_password', data.confirmpassword);
    this.authService.postData('change-forgot', body.toString()).subscribe(response => {
      this.authService.setLoader(false);
      if (response.status === 200) {
        const res = response.data;
        this.login(this.emailId, data.newpassword);
      }
    }, error => {
      this.authService.setLoader(false);
      this.toast.error(error);
    });
  }


  login(email,password) {
    this.authService.setLoader(true);
    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);
    this.authService.postData('login', body.toString()).subscribe(response => {
      this.authService.setLoader(false);
      if (response.data) {
        const res = response.data;
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.id);
        localStorage.setItem('email', res.email);
        localStorage.setItem('username', res.username);
        localStorage.setItem('bio', res.bio);
        this.authService.setUserData({'username': res.username, 'bio': res.bio });
        this.router.navigateByUrl('/user-home/' + res.username);
      }
    }, error => {
      this.authService.setLoader(false);
      this.toast.error(error);
    });
  }

  onForgotFormValuesChanged() {
    for (const field in this.passwordFormErrors) {
      if (!this.passwordFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.passwordFormErrors[field] = {};

      // Get the control
      const control = this.changePassForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.passwordFormErrors[field] = control.errors;
      }
    }

  }

}
