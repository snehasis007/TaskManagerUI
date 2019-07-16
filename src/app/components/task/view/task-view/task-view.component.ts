import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Task } from 'src/app/models/task';
import { ParentTask } from 'src/app/models/parent-task';
import { TaskService } from 'src/app/services/task.service';
//import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {
  modalRef: BsModalRef;
  parentTaskModalRef: BsModalRef;
  projectModalRef: BsModalRef;

  index: number;
  taskList: Task[];
  filteredTasks: Task[];

  parentTasks: ParentTask[];
  filteredParentTasks: ParentTask[];

  taskSearchVal:string;
  ptaskSearchVal:string;
  startDtSearchVal:string;
  endDtSearchVal:string;
  priorityFSearchVal:number;
  priorityTSearchVal:number;
  
  private _parentTaskSearchValue: string = "";
  
  filterTask(event:any){
    if(!this.taskSearchVal || this.taskSearchVal.trim().length==0){
      this.filteredTasks=this.taskList;
    }else{
        this.filteredTasks= this.filteredTasks.filter(task=>{
          if(task.task.startsWith(this.taskSearchVal)){
            return true;
          }
        });
      }
  }
  filterPTask(event:any){
    if(!this.ptaskSearchVal || this.ptaskSearchVal.trim().length==0){
      this.filteredTasks=this.taskList;
    }else{
      this.filteredTasks= this.filteredTasks.filter(task=>{
        if(task.pTask.parentTaskName && task.pTask.parentTaskName.startsWith(this.ptaskSearchVal)){
          return true;
        }
      });
     }
  }
  filterStDtTask(event:any){
    if(!this.startDtSearchVal || this.startDtSearchVal.trim().length==0){
      this.filteredTasks=this.taskList;
    }else{
      this.filteredTasks= this.filteredTasks.filter(task=>{
        if(task.startDate && task.startDate.startsWith(this.startDtSearchVal)){
          return true;
        }
      });
    }
  }
  filterEndDtTask(event:any){
    if(!this.endDtSearchVal || this.endDtSearchVal.trim().length==0){
      this.filteredTasks=this.taskList;
    }else{
      this.filteredTasks= this.filteredTasks.filter(task=>{
        if(task.endDate && task.endDate.startsWith(this.endDtSearchVal)){
          return true;
        }
      });
    }
  }
  filterPriorityFTask(event:any){
    if(!this.priorityFSearchVal || this.priorityFSearchVal==0 || this.priorityFSearchVal.toString().trim().length==0){
      this.filteredTasks=this.taskList;
    }else{
      this.filteredTasks= this.filteredTasks.filter(task=>{
        if(task.priority && (task.priority>=this.priorityFSearchVal )){
          return true;
        }
      });
    }
  }
  filterPriorityTTask(event:any){
    if(!this.priorityTSearchVal || this.priorityTSearchVal==0 || this.priorityTSearchVal.toString().trim().length==0){
      this.filteredTasks=this.taskList;
    }else{
      this.filteredTasks= this.filteredTasks.filter(task=>{
        if(task.priority && (task.priority<=this.priorityTSearchVal)){
          return true;
        }
      });
    }
  }
  errorMsg: String;
  constructor(private taskService: TaskService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getTasks();
  }
  getTasks(): any {
    let obs = this.taskService.getAllTasks();
    obs.subscribe((response: any) => {
      this.taskList = response ? response.dataList : null;
      if(this.taskList && this.taskList.length>0){
        this.taskList.forEach(function(task){
          task.pTask=new ParentTask();
        });
        this.filteredTasks =this.taskList;
      }
      //this.filteredTasks = response ? response.dataList : null;
    },
      error => this.errorMsg = <any>error
    );
  }
  deleteTask(i:number){
    let res=this.taskService.removeTask(this.filteredTasks[i]);
    res.subscribe((response:any)=>{
      this.getTasks();
    },error => this.errorMsg=<any>error
    );
  }

  getParentTasks(): any {
    let obs = this.taskService.getAllParentTasks();
    obs.subscribe((response: any) => {
      this.parentTasks = response ? response.dataList : null;
      this.filteredParentTasks = response ? response.dataList : null;
    },
      error => this.errorMsg = <any>error
    );
  }

  saveTask(i:number): void {
    this.taskService.saveTask(this.filteredTasks[i]).subscribe((response: any) => {
      this.closeModal();
    },
      error => this.errorMsg = <any>error
    );
  }

  endTask(i: number): void {
    this.filteredTasks[i].isTaskCompleted= "Y";
    let obs = this.taskService.saveTask(this.filteredTasks[i]);
    obs.subscribe(res => this.filteredTasks[i].isTaskCompleted = 'Y');
  }

  closeModal() {
    this.modalRef.hide();
  }
  openModal(template: TemplateRef<any>, i:number) {
    this.index = i;
    this.modalRef = this.modalService.show(template);
  }

  

  

  openParentTaskModal(template: TemplateRef<any>): void {
    this.getParentTasks();
    this.parentTaskModalRef = this.modalService.show(template);
  }
  closeParentTaskModal(): void {
    this.parentTaskModalRef.hide();
  }

  selectParentTask(i: number): void {
    this.filteredTasks[i].pTask = this.filteredParentTasks[i];
    this.closeParentTaskModal();
  }
  validateDate(i:any): boolean {
    let startDateStr = this.filteredTasks[i].startDate;
    let endDateStr = this.filteredTasks[i].endDate;
    let startDate: Date = new Date(startDateStr);
    let endDate: Date = new Date(endDateStr);
    let flag: boolean = false;
    if (endDate.getTime() >= startDate.getTime()) {
      flag = true;
    }
    return flag;
  }
  sortByStartDate(): void {
    this.filteredTasks.sort((a: Task, b: Task) => {
      let date1: Date = new Date(a.startDate);
      let date2: Date = new Date(b.startDate);
      if (date1 > date2) return -1;
      if (date1 < date2) return 1;
      return 0;
    });
  }

  sortByEndDate(): void {
    this.filteredTasks.sort((a: Task, b: Task) => {
      let date1: Date = new Date(a.endDate);
      let date2: Date = new Date(b.endDate);
      if (date1 > date2) return -1;
      if (date1 < date2) return 1;
      return 0;
    });
  }
  sortByPriority(): void {
    this.filteredTasks.sort((a: Task, b: Task) => {
      let value1: number = a.priority;
      let value2: number = b.priority;
      return value2 - value1;
    });
  }

  sortByCompletion(): void {
    this.filteredTasks.sort((a: Task, b: Task) => {
      let value1: string = a.isTaskCompleted.toLocaleLowerCase();
      let value2: string = b.isTaskCompleted.toLocaleLowerCase();
      if (value1 < value2) return -1;
      if (value1 > value2) return 1;
      return 0;
    });
  }
  reset():void{
    
    this.filteredTasks = this.taskList;    
  }

  onKey(event: any, i): void {
    this.filteredTasks[i].priority = event.target.value;
  }

}
