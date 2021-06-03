import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../book.model';
import { BooksService } from './../books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  books: Book[];
  pageNumbers: number[];
  alertMessage: string;
  currentPage = 1;
  itemsOnPage = 10;

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.subscription = this.booksService.booksChanged.subscribe((response) => {
      this.books = response['books'];

      const totalBooks = response['totalCount'];
      this.alertMessage = totalBooks !== 0 ? '' : 'No books were found...';

      const pagesCount = Math.ceil(totalBooks / this.itemsOnPage);

      this.pageNumbers = [];

      for (let pageNumber = 1; pageNumber <= pagesCount; pageNumber++) {
        this.pageNumbers.push(pageNumber);
      }
    });
  }

  onGoToPage(pageNumber) {
    const limit = this.itemsOnPage;
    const skip = (pageNumber - 1) * this.itemsOnPage;
    const searchQuery = this.booksService.getLastSearchQuery();
    const sortQuery = this.booksService.getLastSortQuery();

    this.booksService.setBooks(limit, skip, searchQuery, sortQuery);
    this.currentPage = pageNumber;
  }

  onNextPage() {
    const nextPage = this.currentPage + 1;
    this.onGoToPage(nextPage);
  }

  onPreviousPage() {
    const previousPage = this.currentPage - 1;
    this.onGoToPage(previousPage);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
