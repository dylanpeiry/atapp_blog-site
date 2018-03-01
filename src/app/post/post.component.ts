import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../services/post.service";
import {AuthService} from "../services/auth/auth.service";
import {ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material";
import {CategoriesService} from "../services/categories/categories.service";

const COMMA = 188;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit {
  /* Gestion du nouveau post */
  new_post = {
    title: '',
    content: '',
    date: null
  };
  post: any;
  /* Quelle vue afficher */
  id: any;
  action: string;
  private sub: any;
  success = true;
  message: string;
  canPublish = false;
  url: string;
  userRoleId: number;
  userId: number;

  /* Edition des catégories */
  categories: any; // Liste des catégories chargées
  removed_categories: any = []; // Liste des catégories à delete de la DB
  added_categories: any = []; // Liste des catégories à add dans la DB
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  separatorKeysCodes = [ENTER, COMMA];

  /***
   * Ajouter une catégorie
   * @param {MatChipInputEvent} event
   */
  addCat(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our person
    if ((value).trim()) {
      this.categories.push({category_name: value.trim(), category_approved: 0});
      this.added_categories.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /***
   * Supprimer une catégorie
   * @param cat
   */
  removeCat(cat: any): void {
    let index = this.categories.indexOf(cat);
    this.added_categories.splice(this.added_categories.indexOf(cat), 1);
    if (index >= 0) {
      let item = this.categories.splice(index, 1);
      // Si la catégorie supprimée est deja dans la base
      if (item[0].hasOwnProperty('category_id')) {
        // do
        this.removed_categories.push(cat);
      } else {
        // else
      }
    }
  }

  /***
   * Constructeur
   * @param {ActivatedRoute} route
   * @param {PostService} postService
   * @param {AuthService} auth
   * @param {CategoriesService} categoriesService
   */
  constructor(private route: ActivatedRoute, private postService: PostService, private auth: AuthService, private categoriesService: CategoriesService) {
    this.userRoleId = auth.userLoggedRole;
    this.userId = this.auth.userLoggedId;
  }

  ngOnInit() {
    this.route.url.subscribe(p => {
      this.url = p[1].path;
    });
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.action = params['action'];
    });
    // must check post has been found or not
    this.postService.getBy(this.id).subscribe(data => {
      if (data.post_found) {
        this.post = data.post;
        this.getCategories(data.post.post_id);
      } else {
        this.post = false;
      }
    });
  }

  /***
   * Ajouter un article
   * @param title
   * @param content
   */
  add(title, content) {
    let d = new Date();
    let date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    let ownerId = this.auth.userLogged$.user_id;
    this.postService.add(title, content, date, ownerId).subscribe(data => {
      this.success = data.post_added;
      if (this.success) {
        this.postService.posts.push(data.post[0]);
        this.message = "Post ajouté avec succès";
      } else {
        this.message = "Erreur lors de l'ajout du post";
      }
    });
  }

  /***
   * Proposer un post
   * @param title
   * @param content
   */
  submit(title, content) {

  }

  /***
   * Modifier un post
   * @param id
   * @param title
   * @param content
   */
  edit(id, title, content) {
    let d = this.postService.getCurrentDate();
    this.postService.edit(id, title, content, d).subscribe(data => {
      this.success = data.post_updated;
      if (this.success) {
        this.message = "Post édité";
      } else {
        this.message = "Le post n'a pas pu être édité";
      }
    });
    let cat_names = [];
    for (let cat of this.added_categories) {
      cat_names.push(cat);
    }
    let cat_ids = [];
    for (let cat of this.removed_categories) {
      cat_ids.push(cat.category_id);
    }
    // supprime
    this.categoriesService.delete(id, cat_ids).subscribe(data => {
    });
    // ajoute
    this.categoriesService.add(id, cat_names).subscribe(data => {
    });

  }

  /***
   * Supprimer un post
   * @param id
   */
  delete(id) {
    this.postService.delete(id).subscribe(data => {
      console.log(data);
      if (data.post_deleted) {
        let index = this.postService.posts.findIndex(x => x.post_id === id);
        this.postService.posts.splice(index, 1);

      }
    });
    this.auth.redirect('posts');
  }

  /***
   * Récupérer les catégories d'un post
   * @param id
   */
  getCategories(id) {
    this.postService.getCategories(id).subscribe(data => {
      if (data.categories_found) {
        this.categories = data.categories;
      } else {
        this.categories = [];
      }
    });
  }

  /***
   * Event lorsque la saisie du (titre || contenu) change
   */
  inputChanged() {
    if (this.new_post.title !== '' && this.new_post.content !== '') {
      this.canPublish = true;
    } else {
      this.canPublish = false;
    }
  }
}
