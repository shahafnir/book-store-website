export class CartItem {
  constructor(
    public bookId: string,
    public amount: number,
    public title: string,
    public author: string,
    public priceUSD: number
  ) {}
}
