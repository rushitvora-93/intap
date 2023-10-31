import { Component, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loader: boolean = false;

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef,){
   this.authService.getLoader().subscribe(value => {
      setTimeout(() => {
          this.loader = value;
      }, 100);
  });
  }
 }
