import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Question, QuestionFormRequest } from 'core/models/question.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = `${environment.apiUrl}/api/question`;

  constructor(private http: HttpClient) { }

  getFormValidateQuestions() {
    return {
      ask: ['', Validators.required],
      type_ask: ['text', Validators.required],
      required: [false],
      options: ['']
    }
  }

  getQuestionsBySurvey(surveyId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/list/${surveyId}`);
  }

  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/${id}`);
  }

  createQuestion(questionData: QuestionFormRequest): Observable<Question> {
    return this.http.post<Question>(this.apiUrl, questionData);
  }

  updateQuestion(id: number, questionData: QuestionFormRequest): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/${id}`, questionData);
  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
