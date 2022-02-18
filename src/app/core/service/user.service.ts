import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiRoot = `http://localhost:3500/users`;

  constructor(private httpClient: HttpClient) { }

  getUser(id: string) {
    return this.httpClient.get(`${this.apiRoot}/${id}`);
  }

  getUsers(): Observable<any> {
    return this.httpClient.get(`${this.apiRoot}`);
  }


  create(user: any) {
    return this.httpClient.post(`${this.apiRoot}`, user);
  }

  update(userId: number, user: any) {
    return this.httpClient.put(`${this.apiRoot}/${userId}`, user);
  }

  delete(userId: number) {
    return this.httpClient.delete(`${this.apiRoot}/${userId}`);
  }
}
