import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {



  constructor(private http: HttpClient) { }

  private url : string = "http://localhost:8080"
  private endpoint : string = "todo"
  private endpointDoneTodo : string = "done"
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };



  getAllTodos() {
    return this.http.get<Todo[]>(`${this.url}/${this.endpoint}`).pipe(
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    )
  }

  getTodoById(id : number) {
    return this.http.get<Todo>(`${this.url}/${this.endpoint}/${id}`).pipe(
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    )
  }

  postTodo(data : Todo) {
    return this.http.post<Todo>(`${this.url}/${this.endpoint}`, JSON.stringify(data), this.httpOptions).pipe(
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    )
  }

  changeDoneStateTodo(data : Todo, id : number) {
    return this.http.post<Todo>(`${this.url}/${this.endpointDoneTodo}/${id}`, JSON.stringify(data)).pipe(
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    )
  }

  editTodo(data : Todo, id : number) {
    return this.http.post<Todo>(`${this.url}/${this.endpoint}/${id}`, JSON.stringify(data)).pipe(
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    )
  }

  deleteTodo(id : number) {
    return this.http.delete<Todo>(`${this.url}/${this.endpoint}/${id}`).pipe(
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    )
  }


}
