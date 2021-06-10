import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { AlertBarService } from './../alert-bar/alert-bar.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  serverEndpointURL = environment.serverEndpointURL;
  token = new BehaviorSubject<String>(null);

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertBarService: AlertBarService
  ) {}

  isLoggedIn() {
    const token = localStorage.getItem('adminToken');

    if (token === 'null' || !token) return false;
    else return true;
  }

  async login(adminData) {
    try {
      const response = await this.httpClient
        .post(this.serverEndpointURL + '/admin/login', adminData)
        .toPromise();

      const token = response['token'];
      localStorage.setItem('adminToken', token);
      this.token.next(token);
      this.alertBarService.alertBarMessage.next(
        `You've logged in successfully as Admin`
      );

      this.router.navigate(['books']);
    } catch (error) {
      console.log(error);
    }
  }

  getHeaders() {
    const token = localStorage.getItem('adminToken');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });

    return headers;
  }

  async logout(allConnections?: Boolean) {
    const headers = this.getHeaders();
    const logoutMethod = allConnections ? 'logoutAll' : 'logout';

    try {
      const response = await this.httpClient
        .post(
          this.serverEndpointURL + '/admin/' + logoutMethod,
          {},
          { headers }
        )
        .toPromise();

      localStorage.setItem('adminToken', null);
      this.token.next(null);

      this.router.navigate(['']);
    } catch (error) {
      console.log(error);
    }
  }
}
