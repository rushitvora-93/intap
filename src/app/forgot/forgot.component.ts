import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  forgotForm: FormGroup;
  forgotFormErrors: any;
  constructor(private router: Router, private toast: ToastrService, private authService: AuthService, private formBuilder: FormBuilder) { 

    this.forgotFormErrors = {
      email: {},
    };
  }

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.forgotForm.valueChanges.subscribe(() => {
      this.onForgotFormValuesChanged();
    });
  }

  onSubmit(data) {
    this.authService.setLoader(true);
    const body = new URLSearchParams();
    body.set('email', data.email);
    this.router.navigateByUrl('/otp');
    this.authService.postData('users/forgot-password', body.toString()).subscribe(response => {
      this.authService.setLoader(false);
      if (response.data) {
        const res = response.data;
        this.authService.setEmail(data.email);
        this.router.navigateByUrl('/otp');
      }
    }, error => {
      this.authService.setLoader(false);
      this.toast.error(error);
    });
  }

  onForgotFormValuesChanged() {
    for (const field in this.forgotFormErrors) {
      if (!this.forgotFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.forgotFormErrors[field] = {};

      // Get the control
      const control = this.forgotForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.forgotFormErrors[field] = control.errors;
      }
    }

  }

}
