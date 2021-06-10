import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from './cart.model';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cartSubscription: Subscription;
  cart: Cart;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.shoppingCartService.setCart();

    this.cartSubscription = this.shoppingCartService.cartChanged.subscribe(
      (cart: Cart) => {
        this.cart = cart;
      }
    );
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe;
  }
}
