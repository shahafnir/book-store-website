import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from './admin.service';

@Injectable({ providedIn: 'root' })
export class AdminAuthGuard implements CanActivate {
  constructor(private adminService: AdminService, private router: Router) {}

  canActivate():
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    const isApproved = this.adminService.isLoggedIn();
    if (isApproved) {
      return true;
    }

    return this.router.navigate(['admin-login']);
  }
}
