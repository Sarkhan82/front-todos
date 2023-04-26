import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from 'src/app/models/todo';
import { TodoServiceService } from 'src/app/service/todo.service.service';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})

export class AddTodoComponent implements OnInit {
  public form! : FormGroup
  public newTodo! : Todo

  constructor(private snackBar : MatSnackBar, private todoService : TodoServiceService) {}

  ngOnInit() : void {
    this.form = new FormGroup<any>({
    todo: new FormGroup<any>({
      title : new FormControl(""),
      description : new FormControl(""),
    }),
    });
  }

  handleAddTodo () : void {
    console.log(this.form.value);
    this.newTodo = this.form.get("todo")?.value;
    this.todoService.postTodo(this.newTodo).subscribe({
      next: res => {
        console.log(res);
        this.snackBar.open(res.title + " a bien était ajouté", '', {
          duration: 2000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        })   
        window.location.reload() 
      },
      error: err => {
        console.error(err.error.detail);
      }
    });
  }
}


