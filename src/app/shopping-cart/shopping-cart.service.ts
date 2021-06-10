import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment.prod';
import { UserService } from '../user/user.service';
import { Cart } from './cart.model';
import { CartItem } from './cart-item.model';
import { BooksService } from '../books/books.service';
import { Book } from '../books/book.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private serverEndpointUrl = environment.serverEndpointURL + '/cart/';
  cartChanged = new BehaviorSubject<{}>(null);
  private cart: Cart;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private bookService: BooksService
  ) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  saveCartInLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  resetCart() {
    this.cart = new Cart([], '', 0);
    this.saveCartInLocalStorage();
    this.cartChanged.next(this.cart);
  }

  addToCart(bookId) {
    const headers = this.userService.getHeaders();

    return this.httpClient
      .post(this.serverEndpointUrl + 'add-item/' + bookId, {}, { headers })
      .pipe(catchError(this.handleError));
  }

  addToCartUnregisteredUser(bookId: string) {
    this.bookService.getBookDetails(bookId).subscribe(
      (book: Book) => {
        const itemFoundInCart = this.cart.items.find(
          (item) => item.bookId === bookId
        );
        if (itemFoundInCart) {
          itemFoundInCart.amount++;
        } else {
          this.cart.items.push(
            new CartItem(book._id, 1, book.title, book.author, book.priceUSD)
          );
        }

        this.calculateTotalCost();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setCart(cart?: Cart) {
    if (!this.userService.isLoggedIn()) return this.calculateTotalCost(cart);

    const headers = this.userService.getHeaders();

    this.httpClient
      .get(this.serverEndpointUrl, { headers })
      .pipe(catchError(this.handleError))
      .subscribe(
        (cart: Cart) => {
          this.cart = cart;
          this.calculateTotalCost();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  calculateTotalCost(cart?: Cart) {
    if (cart) this.cart = cart;

    this.cart.totalCost = this.cart.items.reduce((totalCost, item) => {
      return totalCost + item.priceUSD * item.amount;
    }, 0);

    this.cartChanged.next(this.cart);
  }

  removeItem(itemId) {
    const headers = this.userService.getHeaders();

    return this.httpClient
      .post(this.serverEndpointUrl + 'remove-item/' + itemId, {}, { headers })
      .pipe(catchError(this.handleError));
  }

  removeItemUnregisteredUser(itemId) {
    this.cart.items = this.cart.items.filter((item) => item.bookId !== itemId);
    this.calculateTotalCost();
  }

  reduceItemAmount(itemId: String) {
    const headers = this.userService.getHeaders();

    return this.httpClient
      .post(this.serverEndpointUrl + 'reduce-amount/' + itemId, {}, { headers })
      .pipe(catchError(this.handleError));
  }

  reduceItemAmountUnregisteredUser(itemId) {
    const cartItem = this.cart.items.find((item) => item.bookId === itemId);
    if (!cartItem) return;
    cartItem.amount--;
    if (cartItem.amount === 0) this.removeItemUnregisteredUser(itemId);

    this.calculateTotalCost();
  }

  increaseItemAmount(itemId: String) {
    const headers = this.userService.getHeaders();

    return this.httpClient
      .post(
        this.serverEndpointUrl + 'icrease-amount/' + itemId,
        {},
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  increaseItemAmountUnregisteredUser(itemId) {
    const cartItem = this.cart.items.find((item) => item.bookId === itemId);
    if (!cartItem) return;
    cartItem.amount++;

    this.calculateTotalCost();
  }

  updateCartRegisteredUser() {
    const headers = this.userService.getHeaders();

    return this.httpClient
      .patch(this.serverEndpointUrl, { items: this.cart.items }, { headers })
      .pipe(catchError(this.handleError));
  }
}
