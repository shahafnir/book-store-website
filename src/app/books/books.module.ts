import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { BooksComponent } from './books.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookItemComponent } from './book-list/book-item/book-item.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookNewComponent } from './book-new/book-new.component';

@NgModule({
  declarations: [
    BooksComponent,
    BookListComponent,
    BookItemComponent,
    BookEditComponent,
    BookDetailsComponent,
    BookNewComponent,
  ],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
})
export class BooksModule {}
