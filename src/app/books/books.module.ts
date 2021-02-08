import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksComponent } from './books.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookItemComponent } from './book-list/book-item/book-item.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookDetailsComponent } from './book-details/book-details.component';

@NgModule({
  declarations: [
    BooksComponent,
    BookListComponent,
    BookItemComponent,
    BookEditComponent,
    BookDetailsComponent,
  ],
  imports: [CommonModule],
})
export class BooksModule {}
