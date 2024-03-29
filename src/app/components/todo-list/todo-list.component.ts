import { Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Todo } from 'src/app/models/todo';
import { TodoServiceService } from '../../service/todo.service.service';
import { DetailedTodoComponent, DetailedTodoComponentModel } from '../detailed-todo/detailed-todo.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent, ConfirmModalModel } from '../confirm-modal/confirm-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditTodoComponent, EditTodoModel } from '../edit-todo/edit-todo.component';
import { AddTodoComponent, AddTodoModel } from '../add-todo/add-todo.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit{

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
  this.todoService.getAllTodos().subscribe({
    next: (res) => {
      const filteredRes = res.filter(todo => !todo.done).concat(res.filter(todo => todo.done));
      this.dataSource = new MatTableDataSource<Todo>(filteredRes);
      console.log(this.dataSource);  
    },
    error: (err) => {
      console.error(err);
    } 
  });
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

handleDoneState(todo : Todo) {
  this.todoService.changeDoneStateTodo(todo.id).subscribe({
    next: () => {
    this.getAllTodos();
    },
   error(err) {
       console.error(err)
   },

  })
}

redirectEditTodo(todo : Todo) {
  const dialogData = new EditTodoModel(todo);
  this.dialog.open(EditTodoComponent, {
    maxWidth: '1000px',
    data: dialogData,
  }).afterClosed().subscribe(res => {
    if(res === true) {
      this.getAllTodos();
    }
  });
}

redirectToAddTodo() {
  const dialogData = new AddTodoModel("Ajouter une nouvelle todo");
  this.dialog.open(AddTodoComponent, {
    maxWidth: '1000px',
    data: dialogData,
  }).afterClosed().subscribe(res => {
    if(res === true) {
      this.getAllTodos();
    }
  });
}

};
