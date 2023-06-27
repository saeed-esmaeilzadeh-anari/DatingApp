import { Observable } from 'rxjs';
import { UserDTO } from '../DTOs/userDTO';
import { AccountService } from './../services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};

  isLogin: boolean = true;
  currentUser$: Observable<UserDTO> | undefined;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser;
  }

  login() {
    this.accountService.login(this.model).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logout() {
    this.accountService.logout();
  }
}
