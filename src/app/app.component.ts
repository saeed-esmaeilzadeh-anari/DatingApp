import { AccountService } from './services/account.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserDTO } from './DTOs/userDTO';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  users: any;

  constructor(
    private httpClient: HttpClient,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: UserDTO = JSON.parse(localStorage.getItem('user') || '');
    this.accountService.setCurrentUser(user); // که این یوزری که میفرستیم داخل   =>   replySubject ست می شود
  }

  getUsers() {
    this.httpClient.get('https://localhost:7089/api/user').subscribe(
      (Response) => {
        this.users = Response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
