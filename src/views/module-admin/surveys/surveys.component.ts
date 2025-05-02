import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Survey } from 'core/models/survey.model';
import { SurveyService } from 'core/services/survey.service';
import { SurveysDialogComponent } from './surveys-dialog/surveys-dialog.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-surveys',
  standalone: true,
  templateUrl: './surveys.component.html',
  styleUrl: './surveys.component.scss',
  imports: [
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
  ],
})

export class SurveysComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'description', 'date_register', 'actions'];
  dataSource = new MatTableDataSource<Survey>();

  constructor(private surveyService: SurveyService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSurveys();
  }

  getSurveys(): void {
    this.surveyService.getAllSurveys().subscribe({
      next: (surveys) => {
        this.dataSource.data = surveys;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Error loading surveys:', err);
      }
    });
  }

  openDialog(survey?: Survey): void {
    const dialogRef = this.dialog.open(SurveysDialogComponent, {
      width: '500px',
      data: survey ? { ...survey } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getSurveys();
      }
    });
  }

  deleteSurvey(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta encuesta?')) {
      this.surveyService.deleteSurvey(id).subscribe({
        next: () => {
          this.getSurveys();
        },
        error: (err) => {
          console.error('Error deleting survey:', err);
        }
      });
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

}
