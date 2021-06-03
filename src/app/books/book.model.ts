export class Book {
  constructor(
    public title: string,
    public author: string,
    public publisher: string,
    public publicationDate: Date,
    public language: string,
    public priceUSD: number,
    public imgURL: string,
    public description: string,
    public _id?: string
  ) {}
}
