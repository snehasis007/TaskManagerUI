import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TaskSaveComponent } from './components/task/save/task-save/task-save.component';
import { TaskViewComponent } from './components/task/view/task-view/task-view.component';

const routes: Routes = [
{ path: 'addTask', component: TaskSaveComponent },
{ path: 'viewTask', component: TaskViewComponent }];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ] 
})
export class AppRoutingModule { }
