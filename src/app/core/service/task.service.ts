
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiRoot = `http://localhost:4000/tasks`;

  constructor(private httpClient: HttpClient) { }

  getAllTasks() {
    return this.httpClient.get(`${this.apiRoot}`);
  }

  create(task: any) {
    return this.httpClient.post(`${this.apiRoot}`, task);
  }

  update(taskId: number, task: any) {
    return this.httpClient.put(`${this.apiRoot}/${taskId}`, task);
  }

  delete(taskId: number) {
    return this.httpClient.delete(`${this.apiRoot}/${taskId}`);
  }


}
