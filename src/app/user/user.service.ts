import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.serverEndpointURL + '/users/';
  userNameChanged = new BehaviorSubject<String>(this.getUserName());

  constructor(private httpClient: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  setUserToken(token) {
    localStorage.setItem('userToken', token);
  }

  getUserToken() {
    return localStorage.getItem('userToken');
  }

  isLoggedIn() {
    const token = localStorage.getItem('userToken');

    if (token === 'null' || !token) return false;
    else return true;
  }

  setUserName(name) {
    localStorage.setItem('userName', name);
    this.userNameChanged.next(name);
  }

  getUserName() {
    return localStorage.getItem('userName');
  }

  createNewUser(userData) {
    return this.httpClient
      .post(this.url, userData)
      .pipe(catchError(this.handleError));
  }

  login(userData) {
    return this.httpClient
      .post(this.url + 'login', userData)
      .pipe(catchError(this.handleError));
  }

  getHeaders() {
    const token = this.getUserToken();

    return new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
  }

  logout() {
    const headers = this.getHeaders();
    localStorage.setItem('userToken', null);

    return this.httpClient
      .post(this.url + 'logout', {}, { headers })
      .pipe(catchError(this.handleError));
  }
}
