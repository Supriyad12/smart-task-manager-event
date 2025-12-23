import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Header } from '../../components/header/header';
import { Loader } from '../../components/loader/loader';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, Task } from '../../services/auth.service';


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule , Header, Loader],
  templateUrl: './task-form.html',
    styleUrls: ['./task-form.scss']

})
export class TaskFormComponent implements OnInit {

  taskId: string | null = null;
  task: Task = {
    title: '',
    description: '',
    priority: 'Low',
    status: 'Pending',
    createdAt: ''
  };
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.loadTask(this.taskId);
    }
  }

  loadTask(id: string) {
    this.loading = true;
    this.authService.getTaskById(id).subscribe({
      next: (res: any) => {
        this.task = res.data;
        console.log(this.task);
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load task';
        this.loading = false;
      }
    });
  }

submit(form: NgForm) {
  if (form.invalid) {
    this.error = 'Please fill all required fields correctly';
    return;
  }

  this.loading = true;
  this.error = '';

  if (this.taskId) {
    // UPDATE
    this.authService.updateTask(this.taskId, this.task).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Update failed';
        this.loading = false;
      }
    });
  } else {
    // CREATE
    this.authService.createTask(this.task).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Creation failed';
        this.loading = false;
      }
    });
  }
}

}
