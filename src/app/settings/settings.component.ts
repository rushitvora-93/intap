import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  change() {
    this.router.navigateByUrl('/change-password');
  }

  back() {
    const username = localStorage.getItem('username');
    this.router.navigateByUrl('/user-home/' + username);
  }

  logOut() {
    this.authService.postData('users/logout', {}, 'reset').subscribe(response => {
      
      if (response.status === 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
        localStorage.removeItem('username');
        this.router.navigate(['/login']);
      }
    });
  }

  deleteAccount() {
   const userId = localStorage.getItem('userId');
   this.authService.deleteData('users/' + userId).subscribe(response => {
      
    if (response.status === 200) {
     this.router.navigate(['/login']);
    }
  }, error => {
    this.authService.setLoader(false);
    this.toast.error(error);
  });

  }
}
