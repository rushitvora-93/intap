import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  otpForm: FormGroup;
  otpFormErrors: any;
  emailId;
  constructor(private router: Router, private toast: ToastrService, private authService: AuthService, private formBuilder: FormBuilder) { 
    
    this.authService.getEmail().subscribe(val => {
     this.emailId = val;
    });

    this.otpFormErrors = {
      otp: {},
    };
  }
  ngOnInit(): void {
    this.otpForm = this.formBuilder.group({
      otp: ['', [Validators.required]],
    });

    this.otpForm.valueChanges.subscribe(() => {
      this.onForgotFormValuesChanged();
    });
  }

  onSubmit(data) {
    //this.authService.setLoader(true);
    const body = new URLSearchParams();
    body.set('email', this.emailId);
    body.set('otp', data.otp);
    this.authService.postData('check-otp', body.toString()).subscribe(response => {
      this.authService.setLoader(false);
      if (response.status === 200) {
        const res = response.data;
        this.authService.setEmail(this.emailId);
        this.router.navigateByUrl('/reset-password');
      }
    }, error => {
      this.authService.setLoader(false);
      this.toast.error(error);
    });
  }

  onForgotFormValuesChanged() {
    for (const field in this.otpFormErrors) {
      if (!this.otpFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.otpFormErrors[field] = {};

      // Get the control
      const control = this.otpForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.otpFormErrors[field] = control.errors;
      }
    }

  }

}
