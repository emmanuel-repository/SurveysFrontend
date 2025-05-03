import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Question, QuestionOption } from 'core/models/question.model';
import { QuestionService } from 'core/services/question.service';

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
  formData: { [key: string]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.surveyId = +this.route.snapshot.paramMap.get('id')!;
    this.loadQuestions();
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
    console.log('Formulario enviado:', this.formData);
    // Aquí puedes enviar los datos al backend
  }
}
