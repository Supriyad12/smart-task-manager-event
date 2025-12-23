import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, Task } from '../../services/auth.service';
import { Header } from "../../components/header/header";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss'],
})
export class TaskList implements OnInit {

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  loading = false;
  error = '';
  searchTerm: string = '';
  statusFilter: string = 'All'; // default to show all

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.error = '';
    this.authService.getTasks().subscribe({
      next: (res: any) => {
        // store all tasks
        this.tasks = Array.isArray(res.data) ? res.data : [];
        // show all tasks by default
        this.statusFilter = 'All';
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load tasks';
        this.loading = false;
      }
    });
  }

  applyFilters() {
    this.filteredTasks = this.tasks.filter(task => {
      const matchesStatus = this.statusFilter === 'All' || task.status === this.statusFilter;
      const matchesSearch = !this.searchTerm || task.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }

  filterByStatus(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.statusFilter = selectElement.value;
    this.applyFilters();
  }

  search() {
    this.applyFilters();
  }

  editTask(taskId: string | undefined) {
    if (taskId) {
      this.router.navigate(['/tasks/edit', taskId]);
    }
  }

  deleteTask(taskId: string | undefined) {
    if (!taskId) return;
    if (confirm('Are you sure you want to delete this task?')) {
      this.authService.deleteTask(taskId).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(task => task._id !== taskId);
          this.applyFilters();
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to delete task';
        }
      });
    }
  }
}
