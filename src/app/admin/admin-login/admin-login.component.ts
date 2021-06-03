import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from './../admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  adminLoginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  authenticationFailed = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {}

  async onSubmit() {
    const adminData = {
      email: this.adminLoginForm.value.email,
      password: this.adminLoginForm.value.password,
    };

    await this.adminService.login(adminData);
    this.authenticationFailed = !this.adminService.isLoggedIn();
  }
}
