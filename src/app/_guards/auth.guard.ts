import { Observable, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../services/account.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser.pipe(
      map((user) => {
        if (user) {
          return true;
        } else {
          this.toastr.error('toayogoigjawgjlaskjgk');
          return false;
        }
      })
    );
  }
}
