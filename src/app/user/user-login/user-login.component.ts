import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  authenticationFailed: Boolean;
  userLoginForm: FormGroup;

  constructor(private userService: UserService, private router: Router) {}

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
        this.userService.setUserName(response['user']['name']);

        this.router.navigate(['/books']);
      },
      (error) => {
        console.log(error);
        if (error.status === 400) {
          this.authenticationFailed = true;
        }
      }
    );
  }
}
