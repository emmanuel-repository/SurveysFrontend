import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Question, QuestionOption } from 'core/models/question.model';
import { QuestionService } from 'core/services/question.service';
import { Answered } from 'core/models/answered.model';
import { JwtService } from 'core/services/jwt.service';
import { AnsweredService } from 'core/services/answered.service';
import { SurveyService } from 'core/services/survey.service';
import { Survey } from 'core/models/survey.model';

@Component({
  standalone: true,
  selector: 'app-answered',
  templateUrl: './answered.component.html',
  styleUrls: ['./answered.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})

export class AnsweredComponent implements OnInit {

  surveyId!: number;
  questions: Question[] = [];
  survey!: Survey;
  formData: { [key: string]: string } = {};

  private jwtService = inject(JwtService);

  constructor(private route: ActivatedRoute, private questionService: QuestionService, private answeredService: AnsweredService,
    private surveyService: SurveyService) { }

  ngOnInit(): void {
    this.surveyId = +this.route.snapshot.paramMap.get('id')!;
    this.loadQuestions();
    this.getSurveys();
  }


  getSurveys(): void {
    this.surveyService.getSurveyById(this.surveyId).subscribe({
      next: response => {
        this.survey = response;
      },
      error: error => console.error('Error', error.message)
    });
  }

  loadQuestions(): void {
    this.questionService.getQuestionsBySurvey(this.surveyId).subscribe((data) => {
      this.questions = data.map(q => ({
        ...q,
        parsedOptions: this.parseOptions(q.options)
      }));
    });
  }

  parseOptions(jsonString: string | null | undefined): QuestionOption[] {
    try {
      return jsonString ? JSON.parse(jsonString) : [];
    } catch {
      return [];
    }
  }

  isFormValid(): boolean {
    return this.questions.every(q => {
      return q.required !== 1 || !!this.formData[q.ask];
    });
  }

  onSubmit(): void {

    const answerd: Answered = {
      date_start: new Date().toISOString(),
      date_end: new Date().toISOString(),
      data_surveys: JSON.stringify(this.formData),  // ← Aquí van tus respuestas con `ask` como clave
      user_id: Number(this.jwtService.getUserId()),
      survey_id: this.surveyId
    };

    this.answeredService.createSurvey(answerd).subscribe({
      next: res => console.log('Enviado', res),
      error: err => console.error('Error', err.message)
    })

  }
}
