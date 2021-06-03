import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit() {
    if (this.adminService.isLoggedIn()) {
      this.router.navigate(['books']);
    }
  }
}
