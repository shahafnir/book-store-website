import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { ShoppingCartService } from './../../shopping-cart/shopping-cart.service';
import { Cart } from 'src/app/shopping-cart/cart.model';
import { AlertBarService } from './../../alert-bar/alert-bar.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  authenticationFailed: Boolean;
  userLoginForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private alertBarService: AlertBarService
  ) {}

  ngOnInit(): void {
    this.userLoginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.required,
      ]),
    });
  }

  onSubmit() {
    this.authenticationFailed = false;

    this.userService.login(this.userLoginForm.value).subscribe(
      (response) => {
        this.userService.setUserToken(response['token']);
        const userName = response['user']['name'];
        this.userService.setUserName(userName);
        this.alertBarService.alertBarMessage.next(
          `You've logged in successfully as ${userName}`
        );

        this.updateCart();
        this.router.navigate(['/books']);
      },
      (error) => {
        this.authenticationFailed = true;
      }
    );
  }

  updateCart() {
    this.shoppingCartService.updateCartRegisteredUser().subscribe(
      (cart: Cart) => {
        this.shoppingCartService.calculateTotalCost(cart);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
