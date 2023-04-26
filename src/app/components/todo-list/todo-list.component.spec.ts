import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { of, throwError } from 'rxjs';
import { Todo } from 'src/app/models/todo';
import { TodoServiceService } from '../../service/todo.service.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoServiceSpy: jasmine.SpyObj<TodoServiceService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;


  beforeEach(async () => {
    const todoServiceMock = jasmine.createSpyObj('TodoServiceService', ['getAllTodos', 'deleteTodo']);
    const dialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    const snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ TodoListComponent ],
      providers: [
        { provide: TodoServiceService, useValue: todoServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: MatSnackBar, useValue: snackBarMock },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    todoServiceSpy = TestBed.inject(TodoServiceService) as jasmine.SpyObj<TodoServiceService>;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getAllTodos', () => {
    it('should call the todo service to get all todos', () => {
      const todos: Todo[] = [
        { id: 1, title: 'Todo 1', description: "description1", done: false },
        { id: 2, title: 'Todo 2', description: "description1", done: true },
      ];

      todoServiceSpy.getAllTodos.and.returnValue(of(todos));

      component.getAllTodos();

      expect(todoServiceSpy.getAllTodos).toHaveBeenCalled();
      expect(component.dataSource.data).toEqual(todos);
    });
  });

  
  describe('handleDeleteTodo', () => {
    it('should open the confirmation dialog and call the todo service to delete the todo if confirmed', () => {
      const todo: Todo = { id: 1, title: 'Todo 1', description: "descripption 1", done: false };
      const deleteConfirm = { title: `Delete ${todo.title}`, message: 'Are you sure to delete?' };
      const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of(true), close: null });
      dialogSpy.open.and.returnValue(dialogRefSpyObj);
      todoServiceSpy.deleteTodo.and.returnValue(of());
  
      component.handleDeleteTodo(todo);
  
      expect(dialogSpy.open).toHaveBeenCalledWith(ConfirmModalComponent, {
        data: deleteConfirm
      });
  
      expect(todoServiceSpy.deleteTodo).toHaveBeenCalledWith(todo.id);
  
      expect(component.dataSource.data).not.toContain(todo);
  
      expect(snackBarSpy.open).toHaveBeenCalledWith('Todo successfully deleted!', 'Close', {
        duration: 2000
      });
    });
  
    it('should not delete the todo if not confirmed', () => {
      const todo: Todo = { id: 1, title: 'Todo 1', description: "descripption 1", done: false };
      const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of(false), close: null });
      dialogSpy.open.and.returnValue(dialogRefSpyObj);
  
      component.handleDeleteTodo(todo);
  
      expect(todoServiceSpy.deleteTodo).not.toHaveBeenCalled();
    });
  
    it('should log an error if the todo service throws an error', () => {
      const todo: Todo = { id: 1, title: 'Todo 1', description: "descripption 1", done: false };
      const deleteConfirm = { title: `Delete ${todo.title}`, message: 'Are you sure to delete?' };
      const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of(true), close: null });
      dialogSpy.open.and.returnValue(dialogRefSpyObj);
      const error = 'Error deleting todo';
      todoServiceSpy.deleteTodo.and.returnValue(throwError(error));
  
      component.handleDeleteTodo(todo);
  
      expect(console.error).toHaveBeenCalledWith(error);
    });
  });

  describe('handleDoneState', () => {
    it('should call todoService to change done state and refresh todos', () => {
      const todo: Todo = { id: 1, title: 'Todo 1', description: "description1", done: false };
  
      spyOn(component, 'getAllTodos');
      todoServiceSpy.changeDoneStateTodo.and.returnValue(of(todo));
  
      component.handleDoneState(todo);
  
      expect(todoServiceSpy.changeDoneStateTodo).toHaveBeenCalledWith(todo.id);
      expect(component.getAllTodos).toHaveBeenCalled();
    });
  
    it('should log an error if the todo service throws an error', () => {
      const todo: Todo = { id: 1, title: 'Todo 1', description: "description1", done: false };
      const error = 'Error changing done state';
      spyOn(console, 'error');
      todoServiceSpy.changeDoneStateTodo.and.returnValue(throwError(error));
  
      component.handleDoneState(todo);
  
      expect(todoServiceSpy.changeDoneStateTodo).toHaveBeenCalledWith(todo.id);
      expect(console.error).toHaveBeenCalledWith(error);
    });
  });

})

  