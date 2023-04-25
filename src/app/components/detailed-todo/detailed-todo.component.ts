import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-detailed-todo',
  templateUrl: './detailed-todo.component.html',
  styleUrls: ['./detailed-todo.component.scss']
})
export class DetailedTodoComponent {

 todoToDetailed: Todo;


  constructor(public dialogRef : MatDialogRef<DetailedTodoComponent>, @Inject(MAT_DIALOG_DATA) public data: DetailedTodoComponentModel) {
    this.todoToDetailed = data.todo
  }

  onDismiss(m?: string): void {
    this.dialogRef.close(false);
  }

}

export class DetailedTodoComponentModel {
  constructor(public todo : Todo) { }
}
