import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'core/models/question.model';
import { QuestionService } from 'core/services/question.service';
import { SurveyService } from 'core/services/survey.service';

@Component({
  selector: 'app-answered',
  standalone: true,
  templateUrl: './answered.component.html',
  styleUrl: './answered.component.scss',
  imports: [],
})

export class AnsweredComponent {

  surveyId!: number;

  constructor(private fb: FormBuilder, private surveyService: SurveyService, private route: ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.surveyId = +this.route.snapshot.params['id'];

    this.getQuestions();
  }

  getQuestions(): void {
    this.questionService.getQuestionsBySurvey(this.surveyId).subscribe({
      next: (questions) => {
       console.log(questions)
      },
      error: (err) => {
        console.error('Error loading questions:', err);
      }
    });
  }

}


