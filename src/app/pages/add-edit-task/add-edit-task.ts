import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, Task } from '../../services/auth.service';
import { Header } from '../../components/header/header';
import { Loader } from '../../components/loader/loader';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-edit-task',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Header, Loader],
  templateUrl: './add-edit-task.html',
  styleUrls: ['./add-edit-task.scss'],
})
export class AddEditTask {
  taskForm: FormGroup;
  loading = false;
  isEditMode = false;
  taskId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,  // use AuthService here
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: [''],
      priority: ['Low', Validators.required],
      status: ['Pending', Validators.required],
    });

    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.isEditMode = true;
      this.loadTask(this.taskId);
    }
  }

  loadTask(id: string) {
    this.loading = true;
    this.authService.getTaskById(id).subscribe({
      next: (task) => {
        this.taskForm.patchValue(task);
        this.loading = false;
      },
      error: () => {
        alert('Failed to load task');
        this.loading = false;
      },
    });
  }

 submitTask() {
  if (this.taskForm.invalid) return;

  this.loading = true;
  const taskData: Task = this.taskForm.value;

  if (this.isEditMode && this.taskId) {
    this.authService.updateTask(this.taskId, taskData).subscribe({
      next: () => {
        alert('Task updated successfully');
        this.router.navigate(['/tasks']);
        this.loading = false;
      },
      error: () => {
        alert('Update failed');
        this.loading = false;
      },
    });
  } else {
    this.authService.createTask(taskData).subscribe({
      next: () => {
        alert('Task added successfully');
        this.router.navigate(['/tasks']);
        this.loading = false;
      },
      error: (err) => {
        console.error(err); // log full error for debugging
        alert('Creation failed');
        this.loading = false;
      },
    });
  }
}

}
