import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Answered } from 'core/models/answered.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AnsweredService {

   apiUrl: string = environment.apiUrl;

   constructor(private http: HttpClient) {}

  // 1. Enviar respuestas
  createSurvey(answered: Answered): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/answered`, answered);
  }

  // 2. Obtener encuestas contestadas por un usuario
  getAnsweredSurveysByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/answered/user/${userId}`);
  }

  // 3. Obtener una encuesta contestada por ID
  getAnsweredById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
