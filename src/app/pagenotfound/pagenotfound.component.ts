import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PagenotfoundComponent implements OnInit {

  d = new Date();
  date: string;

  constructor() {
    this.date = (this.d.getFullYear() + '-' + (this.d.getMonth() + 1) + '-' + this.d.getDate());
    console.log(this.date);
  }

  ngOnInit() {
  }

}
