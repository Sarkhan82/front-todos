import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Todo } from 'src/app/models/todo';
import { TodoServiceService } from '../../service/todo.service.service';
import { DetailedTodoComponent, DetailedTodoComponentModel } from '../detailed-todo/detailed-todo.component';
import { MatDialog } from '@angular/material/dialog';

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

constructor(private todoService : TodoServiceService, public dialog : MatDialog) {}

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
}
