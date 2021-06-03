import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { UserNewComponent } from './user-new/user-new.component';
import { UserComponent } from './user.component';
import { UserLoginComponent } from './user-login/user-login.component';

@NgModule({
  declarations: [UserComponent, UserNewComponent, UserLoginComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
})
export class UserModule {}
