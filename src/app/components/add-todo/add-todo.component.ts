import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from 'src/app/models/todo';
import { TodoServiceService } from 'src/app/service/todo.service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})

export class AddTodoComponent implements OnInit {
  public form! : FormGroup
  public newTodo! : any
  public message! : string

  constructor(private snackBar : MatSnackBar, 
    private todoService : TodoServiceService, 
    public dialogRef: MatDialogRef<AddTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddTodoModel
    ) {
      this.message = data.message;
    }

  ngOnInit() : void {
    this.form = new FormGroup({
      'title': new FormControl('', Validators.required),
      'description': new FormControl('')
    });
  }

  handleAddTodo(): void {
    this.newTodo = {
      title: this.form.get('title')?.value,
      description: this.form.get('description')?.value,
    };
    this.todoService.postTodo(this.newTodo).subscribe({
      next: res => {
        console.log(res);
        this.snackBar.open(res.title + ' a bien été ajouté', '', {
          duration: 2000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
        this.dialogRef.close(true);
      },
      error: err => {
        console.error(err.error.detail);
      }
    });
  }
  
}

export class AddTodoModel {
  constructor(public message: string) { }
}


