import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class CategoriesService {

  constructor(private http: Http) {
  }

  add(post_id, categories_names) {
    let names = '?names=';

    for (let i = 0; i < categories_names.length; i++) {
      if (i < categories_names.length) {
        names += categories_names[i];
      }
      if (i < categories_names.length - 1) {
        names += ',';
      }
    }
    return this.http.post('http://localhost:3000/posts/' + post_id + '/categories' + names, null).map(res => res.json());
  }

  delete(post_id, categories_ids) {
    let ids = '?ids=';
    for (let i = 0; i < categories_ids.length; i++) {
      if (i < categories_ids.length) {
        ids += categories_ids[i];
      }
      if (i < categories_ids.length - 1)
        ids += ',';
    }
    return this.http.delete('http://localhost:3000/posts/' + post_id + '/categories' + ids).map(res => res.json());
  }
}
