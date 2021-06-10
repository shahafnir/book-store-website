import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BooksService } from './books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  searchForm: FormGroup;
  sortForm: FormGroup;
  searchSortOptions = [
    'Title',
    'Author',
    'Price',
    'Publisher',
    'Publication date',
  ];
  sortOrder = -1;
  searchQuery;

  constructor(private fb: FormBuilder, private booksService: BooksService) {}

  ngOnInit() {
    this.booksService.setBooks(10, 0);

    this.searchForm = this.fb.group({
      searchCriteria: [this.searchSortOptions[0]],
      searchValue: [''],
      price: this.fb.group({
        min: ['0'],
        max: ['100'],
      }),
    });

    this.sortForm = this.fb.group({
      sortBy: [this.searchSortOptions[4]],
    });
  }

  onSearchBook() {
    this.searchQuery = this.searchForm.get('searchCriteria').value;
    let searchCriteria = this.searchQuery.toLowerCase();

    if (searchCriteria === 'publication date') {
      searchCriteria = 'publicationDate';
    }

    let toSearch;

    if (searchCriteria !== 'price') {
      const searchValue = this.searchForm.get('searchValue').value;

      this.searchQuery = searchValue
        ? this.searchQuery + ': ' + searchValue
        : '';
      toSearch = searchCriteria + '=' + searchValue;
    } else {
      const minPrice = this.searchForm.get('price').get('min').value || 0;
      const maxPrice = this.searchForm.get('price').get('max').value || 0;

      this.searchQuery += ': ' + minPrice + ' $ - ' + maxPrice + ' $';
      toSearch = searchCriteria + '=' + minPrice + ':' + maxPrice;
    }

    this.booksService.setBooks(10, 0, toSearch);
    this.sortOrder = -1;
    this.sortForm.get('sortBy').setValue(this.searchSortOptions[4]);
  }

  onSortBooks() {
    let sortBy = this.sortForm.get('sortBy').value.toLowerCase();

    if (sortBy === 'publication date') {
      sortBy = 'publicationDate';
    } else if (sortBy === 'price') {
      sortBy = 'priceUSD';
    }

    let order = this.sortOrder;

    this.booksService.setBooks(
      10,
      0,
      this.booksService.getLastSearchQuery(),
      sortBy + ':' + order
    );
  }

  onChangeSortOrder() {
    this.sortOrder = -this.sortOrder;
    this.onSortBooks();
  }
}
