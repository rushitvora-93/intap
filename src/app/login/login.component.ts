import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginFormErrors: any;

  constructor(private router: Router, private toast: ToastrService, private authService: AuthService, private formBuilder: FormBuilder) {
    this.loginFormErrors = {
      email: {},
      password: {}
    };
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });
  }

  onSubmit(data) {
    this.authService.setLoader(true);
    const body = new URLSearchParams();
    body.set('email', data.email);
    body.set('password', data.password);
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

  onLoginFormValuesChanged() {
    for (const field in this.loginFormErrors) {
      if (!this.loginFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.loginFormErrors[field] = {};

      // Get the control
      const control = this.loginForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.loginFormErrors[field] = control.errors;
      }
    }

  }

  

}
