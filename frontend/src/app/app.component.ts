import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ApiService } from './shared/services/api.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SharedModule,AuthModule,UsersModule,BooksModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'frontend';

  ngOnInit(): void {
    let status = this.apiService.isLoggedIn()?'loggedIn':'loggedOff';
    this.apiService.userStatus.next(status);
  }

  constructor(private apiService: ApiService){}
}
