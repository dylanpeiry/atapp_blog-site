import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {SimpleChanges, Input} from "@angular/core";
import {AuthService} from "./auth/auth.service";

@Injectable()
export class PostService {
  posts = []; // Contient les articles

  constructor(private http: Http) {
  }

  get() {
    return this.http.get('http://localhost:3000/posts').map((res: Response) => res.json());
  }

  getBy(id: number) {
    return this.http.get('http://localhost:3000/posts/' + id).map(res => res.json());
  }

  getByStatus(status: string) {
    return this.http.get('http://localhost:3000/posts/status/' + status).map(res => res.json());
  }

  getCategories(id) {
    return this.http.get('http://localhost:3000/posts/' + id + '/categories').map(res => res.json());
  }

  add(title, content, date, user_id) {
    return this.http.post('http://localhost:3000/posts', {
      title: title,
      content: content,
      date: date,
      user_id: user_id
    }).map((res: Response) => res.json());
  }

  edit(id, title, content, d) {
    return this.http.put('http://localhost:3000/posts/' + id, {
      title: title,
      content: content,
      updated_at: d
    }).map(res => res.json());
  }

  delete(id) {
    return this.http.delete('http://localhost:3000/posts/' + id).map(res => res.json());
  }

  getCurrentDate() {
    let d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }
}
