

import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { TaskList } from './pages/task-list/task-list';
import { AddEditTask } from './pages/add-edit-task/add-edit-task';
import { AuthGuard } from './guards/auth-guard';
import { TaskFormComponent } from './pages/task-form/task-form';

export const routes: Routes = [
  { path: 'register', component: Register },
  { path: 'login', component: Login },

  {
    path: 'tasks',
    component: TaskList,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks/add',
    component: AddEditTask,
    canActivate: [AuthGuard]
  },

{
  path: 'tasks/edit/:id',
  component: TaskFormComponent,
    canActivate: [AuthGuard]
}
,
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: '**', redirectTo: '/register' }
];
 