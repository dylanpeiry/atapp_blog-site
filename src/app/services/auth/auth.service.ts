import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from "@angular/http";
import {Router} from "@angular/router";
import {CookieService} from "angular2-cookie/core";
import {Subject} from "rxjs/Subject";


@Injectable()
export class AuthService {
  userLogged$: any;
  userLoggedRole: number;
  userLoggedId: number;
  userLoggedChange: Subject<any> = new Subject<any>();
  users: any = {};

  constructor(private http: Http, private router: Router, private cookieService: CookieService) {
    // Save users to the local variable when they are all loaded
    this.loadUsers().subscribe(users => {
      this.users = users;
    });
  }

  change(value: any) {
    this.userLogged$ = value;
    this.userLoggedRole = this.userLogged$.ROLES_role_id;
    this.userLoggedId = this.userLogged$.user_id;
    this.userLoggedChange.next(this.userLogged$);
  }

  checkLogin(username: string, password: string) {
    return this.http.post('http://localhost:3000/auth', {
      username: username,
      password: password
    }).map(res => res.json());

  }

  register(username, firstName, lastName, mail, password) {
    return this.http.post('http://localhost:3000/users', {
      username: username,
      firstName: firstName,
      lastName: lastName,
      mail: mail,
      password: password
    }).map(res => res.json());
  }

  /**
   * Change to get only usernames and emails
   * Get USERS from api
   * @returns {Observable<any>}
   */
  loadUsers() {
    return this.http.get('http://localhost:3000/users').map((res: Response) => res.json());
  }

  redirect(route: string) {
    this.router.navigate([route]);
  }

  putCookie(key, value) {
    this.cookieService.put(key, value);
  }

  getCookie(key) {
    return this.cookieService.get(key);
  }

  removeCookie(key) {
    this.cookieService.remove(key);
  }

  logout() {
    this.removeCookie('uid_logged');
    this.change(false);
  }
}
