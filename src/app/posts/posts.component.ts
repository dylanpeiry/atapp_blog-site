import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PostService} from '../services/post.service';
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostsComponent implements OnInit {

  constructor(private postService: PostService, private auth: AuthService) {
  }

  posts = [];
  post_added;
  categories = {};
  title;
  content;

  ngOnInit() {
    this.load();
  }

  load() {
    this.postService.get().subscribe(data => {
      this.postService.posts = data;
      this.posts = this.postService.posts;
    });
  }

  userById(id: number) {
    let user = this.auth.users.find(u => u.user_id === id);
    return user.username;
  }

  getCategories(id) {
    let cat = this.posts.find(p => p.post_id === id);
    return cat.Categories;
  }
}
