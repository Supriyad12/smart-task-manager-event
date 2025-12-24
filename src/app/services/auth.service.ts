import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Task {
createdAt: string | number | Date; 
  _id?: string;
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Completed';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

//  private authUrl = 'https://backend-31kk5g4ob-supriyad12s-projects.vercel.app/auth';
//  private taskUrl = 'https://backend-31kk5g4ob-supriyad12s-projects.vercel.app/tasks';
 private authUrl = 'https://smart-task-manager-event-f-ewg3.vercel.app/auth';
  private taskUrl = 'https://smart-task-manager-event-f-ewg3.vercel.app/tasks';

  constructor(private http: HttpClient) { }

  // ---------------- AUTH ----------------
  register(data: any) {
    return this.http.post(`${this.authUrl}/register`, data);
  }

  login(data: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.authUrl}/login`, data)
      .pipe(
        tap(res => localStorage.setItem('token', res.token))
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  profile(): Observable<any> {
    return this.http.get(`${this.authUrl}/profile`, this.getAuthHeaders());
  }

  // ---------------- TASKS ----------------
  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token') || '';
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  getTasks(): Observable<Task[]> {
    const headers = (typeof window !== 'undefined') ? this.getAuthHeaders().headers : new HttpHeaders();
    return this.http.get<Task[]>(this.taskUrl, { headers });
  }

  getTaskById(id: string): Observable<Task> {
    const headers = (typeof window !== 'undefined') ? this.getAuthHeaders().headers : new HttpHeaders();
    return this.http.get<Task>(`${this.taskUrl}/${id}`, { headers });
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.taskUrl, task, this.getAuthHeaders());
  }

 // UPDATE TASK
updateTask(id: string, task: Task): Observable<Task> {
  return this.http.put<Task>(`${this.taskUrl}/${id}`, task, this.getAuthHeaders());
}

// DELETE TASK
deleteTask(id: string): Observable<any> {
  return this.http.delete(`${this.taskUrl}/${id}`, this.getAuthHeaders());
}

}
