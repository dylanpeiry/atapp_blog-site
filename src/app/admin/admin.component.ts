import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {PostService} from "../services/post.service";
import {getAllDebugNodes} from "@angular/core/src/debug/debug_node";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {
  pending = [];
  accepted = [];
  declined = [];

  constructor(private auth: AuthService, private postService: PostService) {
    this.getPendingPosts();
    this.getAcceptedPosts();
    this.getDeclinedPosts();
  }

  ngOnInit() {
  }

  getPendingPosts() {
    this.postService.getByStatus('pending').subscribe(data => this.pending = data.posts);
  }

  getDeclinedPosts() {
    this.postService.getByStatus('declined').subscribe(data => this.declined = data.posts);
  }

  getAcceptedPosts() {
    this.postService.getByStatus('accepted').subscribe(data => this.accepted = data.posts);
  }

  userById(id: number) {
    let user = this.auth.users.find(u => u.user_id === id);
    return user.username;
  }
}
