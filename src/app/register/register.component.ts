import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Http} from "@angular/http";
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../services/auth/auth.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  newUser = {
    username: '',
    firstName: '',
    lastName: '',
    mail: '',
    password: '',
    cPassword: ''
  };
  error: string;
  usernames = [];
  mails = [];
  uExists: false;
  mExists: false;
  registrationDisabled = true;
  success: string;

  /**
   * Contrôles de forms pour gérer les erreurs
   * @type {FormControl}
   */
  mail = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', [Validators.required, Validators.minLength(4)]);

  mailError() {
    return this.mail.hasError('required') ? 'Email requise.' :
      this.mail.hasError('email') ? 'Email invalide' :
        this.mail.hasError('MailExists') ? 'Email déjà utilisée' :
          null;
  }

  usernameError() {
    return this.username.hasError('required') ? "Un nom d'utilisateur est requis" : this.username.hasError('minlength') ? "Nom d'utilisateur trop court" : null;
  }


  constructor(private http: Http, private auth: AuthService) {
    this.loadMails().subscribe(m => this.mails = m.mails);
    this.loadUsernames().subscribe(u => this.usernames = u.usernames);
  }

  ngOnInit() {
  }

  inputChanged() {
    if (this.newUser.username !== '' && this.newUser.firstName !== '' && this.newUser.lastName !== '' && this.newUser.mail !== '' && this.newUser.password
      !== '' && this.newUser.cPassword !== '' && this.username.errors === null && this.mail.errors === null) {
      this.registrationDisabled = false;
    } else {
      this.registrationDisabled = true;
    }
  }

  loadUsernames() {
    return this.http.get('http://localhost:3000/users/get/usernames').map(res => res.json());
  }

  loadMails() {
    return this.http.get('http://localhost:3000/users/get/mails').map(res => res.json());
  }

  usernameExists(username: string) {
    return this.usernames.find(u => u.username === username) ? true : false;
  }

  mailExists(mail: string) {
    return this.mails.find(m => m.mail === mail) ? true : false;
  }

  register(username, firstName, lastName, mail, password) {
    this.auth.register(username, firstName, lastName, mail, password).subscribe(data => {
      if (data.registration_completed) {
        this.success = "Vous vous êtes inscrit avec succès ! Redirection vers la page de connexion ...";
        setTimeout(() => {
          this.auth.redirect('login');
        }, 3000);
      } else {
        this.success = "Erreur lors de l'inscription";
      }
    });
  }

  buttonClick() {
    if (!this.usernameExists(this.newUser.username)) {
      if (!this.mailExists(this.newUser.mail)) {
        if (this.newUser.password === this.newUser.cPassword) {
          this.error = null;
          this.register(this.newUser.username, this.newUser.firstName, this.newUser.lastName, this.newUser.mail, this.newUser.password);
        } else {
          this.error = "Les mots de passes doivent correspondre.";
        }
      } else {
        this.error = "L'email est déjà utilisée.";
      }
    } else {
      this.error = "Le nom d'utilisateur est déjà utilisé.";
    }
  }
}
