import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookStoreComponent } from './book-store/book-store.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    BookStoreComponent,
    UserOrdersComponent
  ],
  imports: [
    SharedModule
  ]
})
export class BooksModule { }
