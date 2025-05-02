import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from 'core/models/user.model';
import { AdminCreateRequest, AdminUpdateRequest } from 'core/models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = `${environment.apiUrl}/api/admin`;

  constructor(private http: HttpClient) { }


  getAllAdmins(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getAdminById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createAdmin(adminData: AdminCreateRequest): Observable<User> {
    return this.http.post<User>(this.apiUrl, adminData);
  }

  updateAdmin(id: number, adminData: AdminUpdateRequest): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, adminData);
  }

  deleteAdmin(id: number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${id}`);
  }

}
