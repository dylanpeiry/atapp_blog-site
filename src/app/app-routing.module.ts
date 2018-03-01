import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PostsComponent} from './posts/posts.component';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {PostComponent} from "./post/post.component";
import {AdminComponent} from "./admin/admin.component";
import {PagenotfoundComponent} from "./pagenotfound/pagenotfound.component";
import {IndexComponent} from "./index/index.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'posts/new',
    component: PostComponent
  },
  {
    path: 'posts/:id/:action',
    component: PostComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: '**',
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
