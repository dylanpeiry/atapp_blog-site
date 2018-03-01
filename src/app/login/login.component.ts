import {Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation, Input} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../services/auth/auth.service";
import {CookieBackendService} from "angular2-cookie/services/cookies.backend.service";
import {CookieService} from "angular2-cookie/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  // Informations utilisateurs
  user = {
    name: '',
    pwd: '',
    stayLogged: false
  };
  userLogged: any;
  // Si le bouton est désactivé
  disabled = true;
  invalidCredentials = false;

  constructor(private auth: AuthService, private cookieService: CookieService) {
  }

  /**
   * Lorsque la saisie de texte change
   */
  inputChanged() {
    if (this.user.name !== '' && this.user.pwd !== '') {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  logUser(user) {
    this.auth.checkLogin(user.name, user.pwd).subscribe(data => {
      let logged = data;
      if (logged.auth_authorized) {
        if (user.stayLogged)
          this.auth.putCookie("uid_logged", data.user.user_id);
        this.auth.change(data.user);
        this.auth.redirect('/posts');
      } else {
        this.invalidCredentials = true;
      }
    });
  }
}
