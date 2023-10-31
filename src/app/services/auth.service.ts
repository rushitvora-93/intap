import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData = new Subject<any>();
  userData$ = this.userData.asObservable();
  loader = new BehaviorSubject(false);
  private userdata = new BehaviorSubject<any>({});
  private emailData = new BehaviorSubject<any>('');
  localDataValuesChange: Subject<any> = new Subject<any>();

  baseUrl : string = 'https://tapin.me/TapinBackend/public/api/';
  //baseUrl : string = 'https://tapin.me/TapinBackend/public/api/';
  // baseUrl : string = 'http://18.191.52.3/TapinBackend/public/api/';
  token;
  
  constructor(private http: HttpClient, private router: Router) { }

  setHeaders() {
    let token = localStorage.getItem('token');
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    if(token) {
      headers = headers.set('Authorization', 'Bearer ' + token );
    }
    
    return headers;
  }

  sendUserData(data){
    this.userData.next(data);
  }

  public getData(url, data?: any): Observable<any>{
    const headers = this.setHeaders();
    if (data){
      const queryParams =  Object.keys(data).map(key => key + '=' + data[key]).join('&');
      url += '?' + queryParams;
    }
    const options = { headers: headers };
    return this.http.get(this.baseUrl + url, options).map(this.extractData).catch(this.handleError);
  }

  public postData(url, data?: any, type?: string): Observable<any> {
    let headers = this.setHeaders();
    /* if (type === 'reset') {
      headers = headers.set('Authorization', 'Bearer 12344' );
    } */
    const options = { headers: headers };
    return this.http.post(this.baseUrl + url, data, options).map(this.extractData).catch(this.handleError);
  }

  public deleteData(url): Observable<any>{
    const headers = this.setHeaders();
    const options = { headers: headers };
    return this.http.delete(this.baseUrl + url, options).map(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  private handleError(error: any) {
    const errMsg = error.error;
    if (typeof errMsg.message === 'object') {
      const arr = Array.from(Object.keys(errMsg.message), k => errMsg.message[k]);
      return throwError(arr);
    }
    return throwError(errMsg.message);
  }

  public setData(data) {
    let key = '';
    const body = new URLSearchParams();
    for (key in data) {
      if (data[key] != null) {
        body.set(key, data[key]);
      }
   }
    return body.toString();
  }

  setLoader(value) {
    this.loader.next(value);
  }

  getLoader() {
    return this.loader.asObservable();
  }

  getUserData() {
    return this.userdata.asObservable();
  }

  setUserData(data) {
    this.userdata.next(data);
  }

  getEmail() {
    return this.emailData.asObservable();
  }

  setEmail(data) {
    this.emailData.next(data);
  }
}