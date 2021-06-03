import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user/user.service';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cartSubscription: Subscription;
  cart;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.shoppingCartService.cartChanged.subscribe(
      (cart) => {
        this.cart = cart;
      }
    );

    this.shoppingCartService.setCart();
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe;
  }
}
