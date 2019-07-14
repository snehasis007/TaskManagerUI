import { ParentTask } from './parent-task';

export class Task{
    id:string;
    pTask?:ParentTask;
    task:string;
    startDate?:string;
    endDate?:string;
    priority?:number;
    isTaskCompleted?:string;
}