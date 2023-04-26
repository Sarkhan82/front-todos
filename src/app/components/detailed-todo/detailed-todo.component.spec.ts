import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedTodoComponent } from './detailed-todo.component';

describe('DetailedTodoComponent', () => {
  let component: DetailedTodoComponent;
  let fixture: ComponentFixture<DetailedTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedTodoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
