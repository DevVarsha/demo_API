import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  // styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id!: number;
  post!: Post;
  form!: FormGroup;
  email!: string;

  constructor(
    public postService: PostService,
    public route: ActivatedRoute,
    public router: Router
  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params.postId;
    // tslint:disable-next-line: deprecation
    this.postService.find(this.id).subscribe((data: Post) => {
      this.post = data;
    });

    this.form = new FormGroup({
      // title: new FormControl('', [Validators.required]),
      // body: new FormControl('', Validators.required)
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required])
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
    this.postService.update(this.email, this.form.value).subscribe(res => {
         console.log('Post updated successfully!');
         this.router.navigateByUrl('post/index');
    });
  }

}
