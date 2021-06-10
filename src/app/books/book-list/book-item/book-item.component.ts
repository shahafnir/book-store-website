import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './../../../admin/admin.service';
import { BooksService } from './../../books.service';
import { Book } from '../../book.model';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss'],
})
export class BookItemComponent implements OnInit {
  @Input('book') book: Book;
  @Input('index') index;
  adminUserLoggedIn: boolean;

  constructor(
    private adminService: AdminService,
    private booksService: BooksService,
    private router: Router
  ) {}

  ngOnInit() {
    this.adminUserLoggedIn = this.adminService.isLoggedIn();
  }

  onBookDetails() {
    this.router.navigate(['books', this.book._id]);
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
