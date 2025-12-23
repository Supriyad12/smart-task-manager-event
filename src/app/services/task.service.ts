import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Task {
  _id?: string;   // ✅ MongoDB ID
  title: string;
  description?: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // private apiUrl = `${environment.apiUrl}/tasks`;
     private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

 // CREATE TASK
createTask(task: Task): Observable<Task> {
  return this.http.post<Task>(`${this.apiUrl}/tasks`, task);
}

// UPDATE TASK
updateTask(id: string, task: Partial<Task>): Observable<Task> {
  return this.http.put<Task>(`${this.apiUrl}/tasks/${id}`, task);
}
  // GET ALL TASKS (filter + search)
  getTasks(status?: string, search?: string): Observable<Task[]> {
    let params = new HttpParams();

    if (status) params = params.set('status', status);
    if (search) params = params.set('search', search);

    return this.http.get<Task[]>(this.apiUrl, { params });
  }

  // GET TASK BY ID
  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }


  // DELETE TASK (soft delete)
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
