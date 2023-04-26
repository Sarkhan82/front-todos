import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Todo } from 'src/app/models/todo';
import { TodoServiceService } from '../../service/todo.service.service';
import { DetailedTodoComponent, DetailedTodoComponentModel } from '../detailed-todo/detailed-todo.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent, ConfirmModalModel } from '../confirm-modal/confirm-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  dataSource!: MatTableDataSource<Todo>;
  displayedColumns: string[] = [
  'done',  
  'title',
  'detail',
  'edit',
  'delete'
];

constructor(private todoService : TodoServiceService, public dialog : MatDialog, public snackBar : MatSnackBar) {}

ngOnInit() {
  this.getAllTodos();
}

getAllTodos() {
  this.todoService.getAllTodos().subscribe(res => {
    this.dataSource = new MatTableDataSource<Todo>(res);
    console.log(this.dataSource);  
  })
}

redirectToDetailedTodo(todo : Todo) {
  const dialogData = new DetailedTodoComponentModel(todo);
  this.dialog.open(DetailedTodoComponent, {
    maxWidth: '1000px',
    data: dialogData
  })
}


handleDeleteTodo(todo: Todo) {
  const deleteConfirm = new ConfirmModalModel(`Supprimer ${todo.title}`, 'Êtes vous sur de vouloir supprimer cette todo ?');
  const dialogRef = this.dialog.open(ConfirmModalComponent, { data: deleteConfirm });
  dialogRef.afterClosed().subscribe((result: boolean) => {
    if (result) {
      this.todoService.deleteTodo(todo.id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter((t) => t.id !== todo.id);
          this.snackBar.open(`${todo.title} a bien été supprimé!`, 'Close', {
            duration: 2000
          });
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  });
}
}
