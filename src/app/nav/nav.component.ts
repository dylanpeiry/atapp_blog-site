import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AuthService} from "../services/auth/auth.service";
import {CookieService} from "angular2-cookie/core";
declare var $:any;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit {
  currentRoute: string;
  id: number;
  userLoggedIn: any;
  userRoleId: number;
  rights = {
    0:["login","posts"],1: [], 2: []
  };

  constructor(private router: Router, private auth: AuthService, private cookie: CookieService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url !== '/' ? event.url.replace('/', '') : event.url;
        console.log(this.currentRoute);
        if (event.id !== null) {
          this.id = event.id;
        }
        // On supprime la classe active de l'ancien élément
        let oldEl = document.querySelector('.active');
        if (oldEl !== null) {
          oldEl.classList.remove('active');
        }
        // On la met sur le nouvel élément correspondant à la page active
        let newEl = document.querySelector("a[routerLink='" + this.currentRoute + "'");
        if (newEl !== null) {
          newEl.classList.add('active');
        }
      }
    });
    //Actualise les variables lorsque l'utilisateur loggué change
    this.auth.userLoggedChange.subscribe(value => {
      this.userLoggedIn = value;
      this.userRoleId = this.userLoggedIn.ROLES_role_id;
      if (value === false) {
        this.auth.redirect('login');
      }
    });
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {

  }

}
