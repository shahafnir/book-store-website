import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from './../../admin/admin.service';
import { BooksService } from './../books.service';
import { Book } from '../book.model';
import { ShoppingCartService } from './../../shopping-cart/shopping-cart.service';
import { UserService } from './../../user/user.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  book: Book = {
    title: '',
    author: '',
    publisher: '',
    publicationDate: new Date(),
    language: '',
    priceUSD: 0,
    imgURL: '',
    description: '',
  };

  adminUserLoggedIn: boolean;

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private adminService: AdminService,
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.adminUserLoggedIn = this.adminService.isLoggedIn();

    this.book.imgURL = '../../../assets/images/Fading_lines.gif';

    const bookId = this.route.snapshot.params.id;

    this.booksService.getBookDetails(bookId).subscribe(
      (book: Book) => {
        this.book = book;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onAddToCart() {
    if (!this.userService.isLoggedIn()) {
      this.shoppingCartService.addToCartUnregisteredUser(this.book._id);
    } else {
      this.shoppingCartService.addToCart(this.book._id).subscribe(
        (cart) => {
          this.shoppingCartService.setCart();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onRemoveBook() {
    const answer = prompt(
      `Are you sure you want to delete ${this.book.title}? y/n`,
      'n'
    );
    if (answer !== 'y') return;

    this.booksService.removeBook(this.book._id);
  }

  onEditBook() {
    this.router.navigate(['books/edit', this.book._id]);
  }
}
