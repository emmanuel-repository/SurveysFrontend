import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Survey } from 'core/models/survey.model';
import { SurveyService } from 'core/services/survey.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-answered',
  standalone: true,
  templateUrl: './answered-list.component.html',
  styleUrl: './answered-list.component.scss',
  imports: [
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
})

export class AnsweredListComponent {

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

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }


}
