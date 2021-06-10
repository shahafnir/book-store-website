import { Component, Input } from '@angular/core';
import { Book } from '../book.model';
import { UserService } from 'src/app/user/user.service';
import { ShoppingCartService } from './../../shopping-cart/shopping-cart.service';
import { AlertBarService } from 'src/app/alert-bar/alert-bar.service';

@Component({
  selector: 'app-add-to-cart-btn',
  template: `
    <button class="add-to-cart-btn" (click)="onAddToCart()">Add To Cart</button>
  `,
  styleUrls: ['./add-to-cart-btn.component.scss'],
})
export class AddToCartBtnComponent {
  @Input('book') book: Book;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private userService: UserService,
    private alertBarService: AlertBarService
  ) {}

  onAddToCart() {
    const bookTitle =
      this.book.title.length > 50
        ? this.book.title.slice(0, 50) + '...'
        : this.book.title;

    let message = `"${bookTitle}" was successfully added to cart.`;

    if (!this.userService.isLoggedIn()) {
      this.shoppingCartService.addToCartUnregisteredUser(this.book._id);
    } else {
      this.shoppingCartService.addToCart(this.book._id).subscribe(
        (cart) => {
          this.shoppingCartService.setCart();
        },
        (error) => {
          message = `Unexpected error! "${bookTitle}" not added to cart.`;
          this.alertBarService.alertBarMessage.next(message);
        }
      );
    }

    this.alertBarService.alertBarMessage.next(message);
  }
}
