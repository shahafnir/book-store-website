import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../user.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss'],
})
export class UserNewComponent implements OnInit {
  errorMessage: String;
  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    passwordValidation: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.errorMessage = '';

    if (
      this.userForm.value.password !== this.userForm.value.passwordValidation
    ) {
      this.errorMessage = "passwords don't match";
      return;
    }

    this.userForm.removeControl('passwordValidation');

    this.userService.createNewUser(this.userForm.value).subscribe(
      (response) => {
        this.userService.setUserToken(response['token']);
        this.userService.setUserName(response['user']['name']);
        this.router.navigate(['/books']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
