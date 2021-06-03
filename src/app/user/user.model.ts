export class User {
  constructor(
    public name: String,
    public email: String,
    public password: String,
    public token?: String,
    public cart?: String
  ) {}
}
