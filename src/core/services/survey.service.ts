import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey, SurveyCreateRequest, SurveyUpdateRequest } from '../models/survey.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private apiUrl = `${environment.apiUrl}/api/survey`;

  constructor(private http: HttpClient) { }

  getAllSurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>(this.apiUrl);
  }

  getSurveyById(id: number): Observable<Survey> {
    return this.http.get<Survey>(`${this.apiUrl}/${id}`);
  }

  createSurvey(surveyData: SurveyCreateRequest): Observable<Survey> {
    return this.http.post<Survey>(this.apiUrl, surveyData);
  }

  updateSurvey(id: number, surveyData: SurveyUpdateRequest): Observable<Survey> {
    return this.http.put<Survey>(`${this.apiUrl}/${id}`, surveyData);
  }

  deleteSurvey(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
