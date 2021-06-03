import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../book.model';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
})
export class BookEditComponent implements OnInit {
  bookForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    publisher: new FormControl(''),
    publicationDate: new FormControl(''),
    language: new FormControl(''),
    priceUSD: new FormControl(''),
    imgURL: new FormControl(''),
    description: new FormControl(''),
  });

  editSuccess = false;

  book: Book;

  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const bookID: String = this.route.snapshot.params.id;

    this.book = <Book>(
      this.booksService.getBooks().find((book: Book) => book._id === bookID)
    );

    this.bookForm = new FormGroup({
      title: new FormControl(this.book.title, [Validators.required]),
      author: new FormControl(this.book.author, [Validators.required]),
      publisher: new FormControl(this.book.publisher, [Validators.required]),
      publicationDate: new FormControl(
        new Date(this.book.publicationDate).toISOString().substring(0, 10),
        [Validators.required]
      ),
      language: new FormControl(this.book.language, [Validators.required]),
      priceUSD: new FormControl(this.book.priceUSD, [Validators.required]),
      imgURL: new FormControl(this.book.imgURL, [Validators.required]),
      description: new FormControl(this.book.description, [
        Validators.required,
      ]),
    });
  }

  async onSubmit() {
    const book = new Book(
      this.bookForm.value.title,
      this.bookForm.value.author,
      this.bookForm.value.publisher,
      new Date(this.bookForm.value.publicationDate),
      this.bookForm.value.language,
      this.bookForm.value.priceUSD,
      this.bookForm.value.imgURL,
      this.bookForm.value.description,
      this.book._id
    );

    await this.booksService.editBook(book);
    this.editSuccess = true;
  }
}
