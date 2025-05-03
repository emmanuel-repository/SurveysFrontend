import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Answered, AnsweredSurvey } from 'core/models/answered.model';
import { AnsweredService } from 'core/services/answered.service';
import { JwtService } from 'core/services/jwt.service';
import { AnsweredResultDialogComponent } from './answered-result-dialog/answered-result-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AnsweredResultsComponent } from '../answered-results/answered-results.component';

@Component({
  selector: 'app-answered-list-result',
  templateUrl: './answered-list-result.component.html',
  styleUrl: './answered-list-result.component.scss',
  imports: [
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    RouterModule],
})

export class AnsweredListResultComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'description', 'date_start', 'date_end', 'actions'];
  dataSource = new MatTableDataSource<Answered>();

  private jwtService = inject(JwtService);

  constructor(private answeredService: AnsweredService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.loadAnswered();
  }

  loadAnswered(): void {
    const userId: number = Number(this.jwtService.getUserId()); // Carga el ID del usuario desde tu sistema de autenticación

    this.answeredService.getAnsweredSurveysByUser(userId).subscribe({
      next: (answered) => {
        this.dataSource.data = answered;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Error loading answered surveys:', err);
      }
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  openDialog(answered: AnsweredSurvey): void {
    this.dialog.open(AnsweredResultDialogComponent, {
      width: '600px',
      data: answered
    });
  }

}
