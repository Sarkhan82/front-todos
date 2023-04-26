import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTodoComponent } from './add-todo.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoServiceService } from 'src/app/service/todo.service.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Todo } from 'src/app/models/todo';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let todoServiceSpy: jasmine.SpyObj<TodoServiceService>;

  beforeEach(async () => {
    const snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);
    const todoServiceMock = jasmine.createSpyObj('TodoServiceService', ['postTodo']);

    await TestBed.configureTestingModule({
      declarations: [ AddTodoComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: TodoServiceService, useValue: todoServiceMock }
      ]
    })
    .compileComponents();

    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    todoServiceSpy = TestBed.inject(TodoServiceService) as jasmine.SpyObj<TodoServiceService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call TodoService to post new todo', () => {
    const todo = { id: 1, title: 'New Todo', description: 'Test description' } as Todo;
    const todoServiceResponse = of(todo);
    todoServiceSpy.postTodo.and.returnValue(todoServiceResponse);

    component.form.setValue({
      todo: {
        title: 'New Todo',
        description: 'Test description'
      }
    });
    component.handleAddTodo();

    expect(todoServiceSpy.postTodo).toHaveBeenCalledOnceWith(todo);
    expect(snackBarSpy.open).toHaveBeenCalledOnceWith(todo.title + " a bien était ajouté", '', jasmine.any(Object));
  });
});