import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserDTO } from '../dto/userdto';
import { Observable } from 'rxjs';
import { MainUrlService } from './main-url.service';
import { map } from 'rxjs/internal/operators';

const URL = '/api/v1/login';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private mainUrl: MainUrlService) { }

  login(user: UserDTO): Observable<boolean> {
    return this.http.post<boolean>(this.mainUrl.MAIN_URL + URL, user)
      .pipe(
        map((result) => {
          sessionStorage.setItem('token', result + '');
          if (result) {
            this.router.navigate(['/adminmain']);
          }
          return result;
        })
      );
  }

  isAuthenticated(): boolean {
    if (sessionStorage.getItem('token')) {
      return sessionStorage.getItem('token') === 'false' ? false : true;
    }
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
