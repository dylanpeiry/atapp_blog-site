import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatGridListModule,
  MatTabsModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatTableModule,
  MatChipsModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpModule} from "@angular/http";
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {PostsComponent} from './posts/posts.component';
import {AdminComponent} from './admin/admin.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {PostComponent} from './post/post.component';
import {PostService} from "./services/post.service";
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component';
import {NavComponent} from './nav/nav.component';
import {IndexComponent} from './index/index.component';
import {LimitToPipe} from "./pipes/limit-to/limit-to.pipe";
import {AuthService} from "./services/auth/auth.service";
import {CookieService} from "angular2-cookie/core";
import {CategoriesService} from "./services/categories/categories.service";
import {FormatPipe} from "./pipes/format/format.pipe";
import {RteComponent} from "./rte/rte.component";
import {FroalaEditorModule,FroalaViewModule} from "angular-froala-wysiwyg";

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    PostComponent,
    PagenotfoundComponent,
    NavComponent,
    IndexComponent,
    LimitToPipe,
    FormatPipe,
    RteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    FlexLayoutModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    HttpModule,
    MatTableModule,
    MatChipsModule,
    FroalaEditorModule,
    FroalaViewModule
  ],
  providers: [PostService, AuthService, CookieService, CategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
