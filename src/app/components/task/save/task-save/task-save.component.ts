import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Task } from 'src/app/models/task';
import { ParentTask } from 'src/app/models/parent-task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.component.html',
  styleUrls: ['./task-save.component.css']
})
export class TaskSaveComponent implements OnInit {
  task: Task;
  v:Array<string>;
  parentTask: ParentTask;
  parentTasks: ParentTask[];
  
  filteredParentTasks: ParentTask[];
  

  
  parentTaskModalRef: BsModalRef;
  

  index: number;
  errorMsg: String;

  
    

  constructor(private modalService: BsModalService, private taskService: TaskService) { 
    this.task = new Task();
   
    this.task.priority = 0;
    this.task.pTask = new ParentTask();
   
  }

  ngOnInit() {
  }

  saveOrUpdateTask(): any {    
    this.taskService.saveTask(this.task).subscribe((response: any) => {
      this.reset();
    },
      error => this.errorMsg = <any>error
    );
  }
  getParentTasks(): any {
    let obs = this.taskService.getAllParentTasks();
    obs.subscribe((response: any) => {
      this.parentTasks = response ? response.data : null;
      this.filteredParentTasks = response ? response.data : null;
    },
      error => this.errorMsg = <any>error
    );
  }
  
  
  onDrag(event: any): void {
    this.task.priority = event.target.value;
  }

  reset(): void {
    
    this.task.task= "";
    
    this.task.startDate = "";
    this.task.endDate = "";
    this.task.pTask.parentTaskName = "";
  }

  validateDate(): boolean {
    let startDateStr = this.task.startDate;
    let endDateStr = this.task.endDate;
    let startDate: Date = new Date(startDateStr);
    let endDate: Date = new Date(endDateStr);
    let flag: boolean = false;
    if (endDate.getTime() >= startDate.getTime()) {
      flag = true;
    }
    return flag;
  }

}
