import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from './../shopping-cart.service';
import { UserService } from './../../user/user.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  @Input('cartItems') cartItems;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  onRemoveItem(itemId: String) {
    if (!this.userService.isLoggedIn()) {
      this.shoppingCartService.removeItemUnregisteredUser(itemId);
    } else {
      this.shoppingCartService.removeItem(itemId).subscribe(
        (cart) => {
          this.shoppingCartService.setCart();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onReduceItemAmount(itemId: String) {
    if (!this.userService.isLoggedIn()) {
      this.shoppingCartService.reduceItemAmountUnregisteredUser(itemId);
    } else {
      this.shoppingCartService.reduceItemAmount(itemId).subscribe(
        (cart) => {
          this.shoppingCartService.setCart();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onIncreaseItemAmount(itemId: String) {
    if (!this.userService.isLoggedIn()) {
      this.shoppingCartService.increaseItemAmountUnregisteredUser(itemId);
    } else {
      this.shoppingCartService.increaseItemAmount(itemId).subscribe(
        (cart) => {
          this.shoppingCartService.setCart();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onBookDetails(bookId) {
    this.router.navigate(['books', bookId]);
  }
}
