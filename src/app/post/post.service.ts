import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiURL = 'http://technorizen.co.in/HomeScan/webservice/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiURL + 'login/')
    .pipe(
      catchError(this.errorHandler)
    );
  }
  create(post: any): Observable<Post> {
    // console.log('username', post.user_name);
    // tslint:disable-next-line: max-line-length
    return this.httpClient.post<Post>(this.apiURL + 'signup?user_name=' + post.user_name +
     '&password=' + post.password + '&email=' + post.email + '&mobile=' + post.mobile + '&whatsapp_number=' + post.whatsapp_number
     + '&address=' + post.address + '&register_id=123' , JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  find(email: any): Observable<Post> {
    return this.httpClient.get<Post>(this.apiURL + '' + email)
    .pipe(
      catchError(this.errorHandler)
    );
  }
  update(email: any, post: any): Observable<Post> {
    return this.httpClient.put<Post>(this.apiURL + 'signup?signup?user_name=' + post.user_name +
    '&password=' + post.password + '&email=' + post.email + '&mobile=' + post.mobile + '&whatsapp_number=' + post.whatsapp_number
    + '&address=' + post.address + '&register_id=123', JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // tslint:disable-next-line: typedef
  delete(email: any){
    return this.httpClient.delete<Post>(this.apiURL + 'login/' + email, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }
  // tslint:disable-next-line: typedef
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
