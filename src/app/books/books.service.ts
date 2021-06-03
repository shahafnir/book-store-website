import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AdminService } from './../admin/admin.service';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  booksChanged = new BehaviorSubject({});
  serverEndpointURL = environment.serverEndpointURL + '/books/';
  private books: Book[] = [];
  private lastSearchQuery: string;
  private lastSortQuery: string;

  constructor(
    private httpClient: HttpClient,
    private adminService: AdminService
  ) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  setBooks(limit?: number, skip?: number, searchBy?: string, sortBy?: string) {
    if (!sortBy) {
      sortBy = 'publicationDate:-1';
    }

    const fromString = `limit=${limit}&skip=${skip}&${searchBy}&sortBy=${sortBy}`;
    let params = new HttpParams({ fromString });

    this.httpClient
      .get(this.serverEndpointURL, { params })
      .pipe(catchError(this.handleError))
      .subscribe(
        (response) => {
          this.books = <Book[]>response['docs'];
          const totalCount = response['total'];
          this.lastSearchQuery = searchBy;
          this.lastSortQuery = sortBy;

          this.booksChanged.next({ books: this.books, totalCount });
        },
        (error) => {
          console.log(error);
          this.books = [];
          const totalCount = 0;

          this.booksChanged.next({ books: this.books, totalCount });
        }
      );
  }

  getLastSearchQuery() {
    return this.lastSearchQuery;
  }

  getLastSortQuery() {
    return this.lastSortQuery;
  }

  getBooks() {
    return this.books.slice();
  }

  getBookDetails(bookId: string) {
    return this.httpClient
      .get(this.serverEndpointURL + bookId)
      .pipe(catchError(this.handleError));
  }

  addBook(book: Book) {
    const headers = this.adminService.getHeaders();

    return this.httpClient
      .post(this.serverEndpointURL, book, headers)
      .pipe(catchError(this.handleError));
  }

  async removeBook(bookID: String) {
    const headers = this.adminService.getHeaders();

    try {
      const response = await this.httpClient
        .delete(this.serverEndpointURL + bookID, headers)
        .toPromise();

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async editBook(book: Book) {
    const headers = this.adminService.getHeaders();
    const bookID = book._id;
    delete book._id;

    try {
      const response = await this.httpClient
        .patch(this.serverEndpointURL + bookID, book, headers)
        .toPromise();

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}
