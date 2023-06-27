import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, map } from 'rxjs';
import { UserDTO } from '../DTOs/userDTO';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl: string = 'https://localhost:7089/api/';
  private currentUserSource = new ReplaySubject<UserDTO>();
  currentUser = this.currentUserSource.asObservable();

  constructor(private httpClient: HttpClient) {}

  login(model: any) {
    return this.httpClient.post(`${this.baseUrl}accoun/login`, model).pipe(
      map((response) => {
        const user: UserDTO = <UserDTO>response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user'); 
    this.currentUserSource.next({} as UserDTO);
    // return this.httpClient.get(`${this.baseUrl}account/logout`);
  }

  setCurrentUser(user: UserDTO) {
    this.currentUserSource.next(user);
  }
}
