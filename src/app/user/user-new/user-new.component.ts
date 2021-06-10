import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/shopping-cart/cart.model';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';
import { UserService } from './../user.service';
import { AlertBarService } from './../../alert-bar/alert-bar.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss'],
})
export class UserNewComponent implements OnInit {
  errorMessage: String;
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private shoppingCartService: ShoppingCartService,
    private router: Router,
    private alertBarService: AlertBarService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordValidation: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  comparePasswords() {
    const password = this.userForm.get('password').value;
    const passwordValidation = this.userForm.get('passwordValidation').value;

    if (passwordValidation !== password)
      this.userForm.get('passwordValidation').setErrors({ notUnique: true });
  }

  onSubmit() {
    this.errorMessage = '';

    this.userService.createNewUser(this.userForm.value).subscribe(
      (response) => {
        this.userService.setUserToken(response['token']);
        this.userService.setUserName(response['user']['name']);

        this.shoppingCartService.updateCartRegisteredUser().subscribe(
          (cart: Cart) => {
            this.shoppingCartService.calculateTotalCost(cart);
          },
          (error) => {
            console.log(error);
          }
        );

        this.alertBarService.alertBarMessage.next(
          'Account has been created successfully, you are logged in.'
        );
        this.router.navigate(['/books']);
      },
      (error) => {
        this.errorMessage =
          error.error.code === 11000
            ? 'Email address already exists.'
            : 'Unexpected error has occurred, account was not created.';
      }
    );
  }
}
