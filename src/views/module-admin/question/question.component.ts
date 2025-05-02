import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Question } from 'core/models/question.model';
import { QuestionService } from 'core/services/question.service';
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';

@Component({
  selector: 'app-question',
  standalone: true,
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    RouterModule
  ],
})

export class QuestionComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  surveyId!: number;
  displayedColumns: string[] = ['id', 'ask', 'type_ask', 'required', 'actions'];
  dataSource = new MatTableDataSource<Question>();

  constructor(private route: ActivatedRoute, private questionService: QuestionService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.surveyId = +this.route.snapshot.params['id'];
    this.getQuestions();
  }

  getQuestions(): void {
    this.questionService.getQuestionsBySurvey(this.surveyId).subscribe({
      next: (questions) => {
        this.dataSource.data = questions;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Error loading questions:', err);
      }
    });
  }

  openDialog(question?: Question): void {
    const dialogRef = this.dialog.open(QuestionDialogComponent, {
      width: '600px',
      data: {
        question: question ? { ...question } : null,
        surveyId: this.surveyId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getQuestions();
      }
    });
  }

  deleteQuestion(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta pregunta?')) {
      this.questionService.deleteQuestion(id).subscribe({
        next: () => {
          this.getQuestions();
        },
        error: (err) => {
          console.error('Error deleting question:', err);
        }
      });
    }
  }

  parseOptions(options?: string): any {
    return options ? JSON.parse(options) : null;
  }

}
