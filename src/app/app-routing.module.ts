import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminAuthGuard } from './admin/admin-auth.guard';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { BooksComponent } from './books/books.component';
import { BookNewComponent } from './books/book-new/book-new.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserNewComponent } from './user/user-new/user-new.component';
import { UserLoginComponent } from './user/user-login/user-login.component';

const routes: Routes = [
  {
    path: 'books',
    children: [
      { path: '', component: BooksComponent },
      {
        path: 'new',
        canActivate: [AdminAuthGuard],
        component: BookNewComponent,
      },
      {
        path: 'edit/:id',
        canActivate: [AdminAuthGuard],
        component: BookEditComponent,
      },
      {
        path: ':id',
        component: BookDetailsComponent,
      },
    ],
  },
  { path: 'cart', component: ShoppingCartComponent },
  {
    path: 'user',
    children: [
      { path: 'new', component: UserNewComponent },
      { path: 'login', component: UserLoginComponent },
    ],
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent,
  },
  {
    path: 'admin',
    canActivate: [AdminAuthGuard],
    children: [{ path: '', component: AdminComponent }],
  },
  { path: '**', component: BooksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
