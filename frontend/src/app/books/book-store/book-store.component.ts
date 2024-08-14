import { Component } from '@angular/core';
import { Book, BooksByCategory } from '../../models/models';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'book-store',
  templateUrl: './book-store.component.html',
  styleUrl: './book-store.component.scss'
})
export class BookStoreComponent {
  displayedColumns: string[]=[
    "id",
    'title',
    'author',
    'price',
    'available',
    'order'
  ];
books:Book[] = [];
booksToDisplay:BooksByCategory[] = [{
bookCategoryId: 1,
category:"c",
subCategory: "s",
books: [{
  id:1,
  title:"T",
  author: "A",
  price: 100,
  ordered: false,
  bookCategoryId: 1,
  bookCategory: {id:1,category:'', subCategory:''},
}]
}];

constructor(private apiService:ApiService,private snackBar:MatSnackBar){
  apiService.getBooks().subscribe({
    next:(res:Book[])=>{
      console.log(res);
    }
  })
}
}
