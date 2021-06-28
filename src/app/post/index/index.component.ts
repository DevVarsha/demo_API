import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { Post } from '../post';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  // styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public form: any;

  posts: Post[] = [];
  router: any;

  constructor(public postService: PostService) {

   }

  ngOnInit(): void {
    this.form = new FormGroup({

       password: new FormControl('', [Validators.required]),
       email: new FormControl('', [Validators.required])
      });

    // tslint:disable-next-line: deprecation
    this.postService.getAll().subscribe((data: Post[]) => {
      this.posts = data;
      console.log(this.posts);
      console.log('get all successfull !');

    });
  }

  // tslint:disable-next-line: typedef
  deletePost(email: any){
    console.log('delete post');
    // tslint:disable-next-line: deprecation
    this.postService.delete(email).subscribe(res => {
        //  this.posts = this.posts.filter(item => item.email !== email);
         console.log('Post deleted successfully!');
    });
  }

  // tslint:disable-next-line: typedef
  get f(){
    return this.form.controls;
  }
  // tslint:disable-next-line: typedef
  submit(){
    console.log(this.form.value);
    // tslint:disable-next-line: deprecation
    this.postService.create(this.form.value).subscribe(res => {
         console.log('login successfully!');
         this.router.navigateByUrl('post/index');
    });
  }
}
