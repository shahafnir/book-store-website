import { Component, HostListener, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private shoppingCartService: ShoppingCartService,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (!this.userService.isLoggedIn()) {
      const savedCart = JSON.parse(localStorage.getItem('cart'));
      this.shoppingCartService.setCart(savedCart);
    }
  }

  @HostListener('window:beforeunload') saveCartOnLeaveSite() {
    if (!this.userService.isLoggedIn())
      this.shoppingCartService.saveCartInLocalStorage();
  }
}
