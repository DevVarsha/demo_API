import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  // styleUrls: ['./create.component.css']
})


export class CreateComponent implements OnInit {
  public form: any;
  constructor(
    public postService: PostService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.form = new FormGroup({
      user_name: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      whatsapp_number: new FormControl('', [Validators.required]),
      // register_id: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
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
         console.log('Post created successfully!');
         this.router.navigateByUrl('post/index');
    });
  }

}
