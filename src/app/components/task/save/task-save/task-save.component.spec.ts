import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSaveComponent } from './task-save.component';

describe('TaskSaveComponent', () => {
  let component: TaskSaveComponent;
  let fixture: ComponentFixture<TaskSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
