import { Injectable } from '@angular/core';
import { TaskConsts } from '../consts/task-consts';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import {Task} from '../models/task';
import { catchError, tap } from 'rxjs/operators';
import { ServiceResult } from '../models/service-result';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAllTasks():Observable<ServiceResult>{
    return this.http.get<ServiceResult>(TaskConsts.VIEWALL_TASK_URL).pipe(
      tap(
        data => {
          this.logResult(data);
        },
        error=> this.handleError(error)
    ));
  }
  getAllParentTasks():Observable<ServiceResult>{
    return this.http.get<ServiceResult>(TaskConsts.VIEWALL_PARENT_TASK_URL).pipe(
      tap(
        data => {
          this.logResult(data);
        },
        error=> this.handleError(error)
    ));
  }

  getTasksByParent(parenttaskName:string):Observable<ServiceResult>{
    return this.http.get<ServiceResult>(TaskConsts.VIEW_TASK_BYPARENT_URL+'/'+parenttaskName).pipe(
      tap(
        data => {
          this.logResult(data);
        },
      error=> this.handleError(error)
    ));
  }

  saveTask(task:Task):Observable<ServiceResult>{
    return this.http.post<ServiceResult>(TaskConsts.ADD_TASK_URL,task,this.httpOptions).pipe(
      tap(
        data => {
          this.logResult(data);
        },
        error=> this.handleError(error)
    ));
  }

  removeTask(task:Task):Observable<ServiceResult>{
    return this.http.post<ServiceResult>(TaskConsts.REMOVE_TASK_URL,task,this.httpOptions).pipe(
      tap(
        data => {
          this.logResult(data);
        },
        error=> this.handleError(error)
    ));
  }

  private logResult(data:ServiceResult){
    if(data && data.data)
      console.debug("service data:"+data.data.toString());
  }
  private handleError(err: HttpErrorResponse) {
    let errMsg = '';
    if (err.error instanceof ErrorEvent) {
     
      errMsg = `An error occurred: ${err.error.message}`;
    } else {
      
      errMsg = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(errMsg);
  }
}
