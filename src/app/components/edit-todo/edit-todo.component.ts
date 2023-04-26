import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from 'src/app/models/todo';
import { TodoServiceService } from 'src/app/service/todo.service.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent {
  public form! : FormGroup
  public todoToEdit! : Todo

  constructor(private snackBar: MatSnackBar,
    private todoService: TodoServiceService,
    public dialogRef: MatDialogRef<EditTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditTodoModel) {
this.todoToEdit = data.todo;
console.log(this.todoToEdit);
this.form = new FormGroup({
  'title': new FormControl(this.todoToEdit.title, Validators.required),
  'description': new FormControl(this.todoToEdit.description)
});
}

  ngOnInit() : void {
  }

  onDismiss(m?: string): void {
    this.dialogRef.close(false);
  }

  handleEditTodo(): void {
    const editedTodo = {
      id: this.todoToEdit.id,
      title: this.form.get('title')?.value,
      description: this.form.get('description')?.value,
      done: this.todoToEdit.done,
    };
  
    this.todoService.editTodo(editedTodo, editedTodo.id).subscribe({
      next: res => {
        console.log(res);
        this.snackBar.open(res.title + ' a bien été édité', '', {
          duration: 2000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        }); 
        this.dialogRef.close(true);  
      },
      error: err => {
        console.error(err.error.detail);
        this.dialogRef.close(false);
      }
    });
  }

}

export class EditTodoModel {
  constructor(public todo : Todo) { }
}



