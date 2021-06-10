import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { AdminService } from './../admin/admin.service';
import { UserService } from './../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  accountMenuOpen = false;
  adminAccountMenuOpen = false;
  isAdminAccount = false;
  userLoggedIn = false;
  adminTokenSubscription: Subscription;
  accountName: String;

  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.adminTokenSubscription = this.adminService.token.subscribe((token) => {
      this.isAdminAccount = !!token;
    });

    this.isAdminAccount = this.adminService.isLoggedIn();

    this.accountName = this.userService.getUserName() || 'Account';

    this.userService.userNameChanged.subscribe((userName) => {
      this.accountName = userName ? `${userName}'s account` : 'Account';

      this.userLoggedIn = this.userService.isLoggedIn();
    });
  }

  toggleAccountMenu() {
    this.accountMenuOpen = !this.accountMenuOpen;

    if (this.adminAccountMenuOpen) {
      this.adminAccountMenuOpen = false;
    }
  }

  toggleAdminAccountMenu() {
    this.adminAccountMenuOpen = !this.adminAccountMenuOpen;

    if (this.accountMenuOpen) {
      this.accountMenuOpen = false;
    }
  }

  closeOpenMenus() {
    this.accountMenuOpen = false;
    this.adminAccountMenuOpen = false;
  }

  onLogoutAdmin() {
    this.adminService.logout();
    this.adminAccountMenuOpen = false;
  }

  onLogoutAdminAll() {
    this.adminService.logout(true);
    this.adminAccountMenuOpen = false;
  }

  onLogoutUser() {
    this.toggleAccountMenu();

    this.userService.logout().subscribe(
      (response) => {
        this.userService.setUserName('');
        this.shoppingCartService.resetCart();

        this.router.navigate(['/books']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    this.adminTokenSubscription.unsubscribe();
  }
}
