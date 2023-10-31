import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  constructor(private router: Router, private toast: ToastrService, private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.resetPasswordForm = this.formBuilder.group({
      current_password: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    });
  }

  back(){
    this.router.navigateByUrl('/settings');
  }

  onSubmit(data) {
    const username = localStorage.getItem('username');
    this.authService.setLoader(true);
    const body = new URLSearchParams();
    body.set('current_password', data.current_password);
    body.set('password', data.password);
    this.authService.postData('users/reset-password', body.toString()).subscribe(response => {
      this.authService.setLoader(false);
      if (response.status === 200) {
        const res = response.data;
        this.router.navigateByUrl('/user-home/' + username);
      }
    }, error => {
      this.authService.setLoader(false);
      this.toast.error(error);
    });
  }

}
