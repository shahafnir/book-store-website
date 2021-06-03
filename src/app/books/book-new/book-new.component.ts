import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BooksService } from './../books.service';
import { Book } from './../book.model';

@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.scss'],
})
export class BookNewComponent implements OnInit {
  bookForm: FormGroup;
  submittedSuccessfully: boolean;
  errorMessage: string;
  bookTitle: string;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      publisher: new FormControl('', [Validators.required]),
      publicationDate: new FormControl(new Date(), [Validators.required]),
      language: new FormControl('', [Validators.required]),
      priceUSD: new FormControl('', [Validators.required]),
      imgURL: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  resetSubmissionStatus() {
    this.submittedSuccessfully = false;
    this.errorMessage = '';
  }

  onSubmit() {
    this.bookTitle = this.bookForm.get('title').value;
    this.submittedSuccessfully = false;
    this.errorMessage = '';

    const book = new Book(
      this.bookForm.value.title,
      this.bookForm.value.author,
      this.bookForm.value.publisher,
      new Date(this.bookForm.value.publicationDate),
      this.bookForm.value.language,
      this.bookForm.value.priceUSD,
      this.bookForm.value.imgURL,
      this.bookForm.value.description
    );

    this.booksService.addBook(book).subscribe(
      (response) => {
        this.submittedSuccessfully = true;
        this.bookForm.reset();
      },
      (error) => {
        if (error.error === 'This book already exists') {
          this.errorMessage = error.error;
        } else {
          this.errorMessage = `Unexpected error has been occured, "${this.bookTitle}" was not submitted.`;
        }
      }
    );
  }
}
