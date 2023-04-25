import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Todo } from 'src/app/models/todo';
import { TodoServiceService } from '../../service/todo.service.service';

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

constructor(private todoService : TodoServiceService) {}

ngOnInit() {
  this.getAllTodos();
}

getAllTodos() {
  this.todoService.getAllTodos().subscribe(res => {
    this.dataSource = new MatTableDataSource<Todo>(res);
    console.log(this.dataSource);  
  })
}
}
