import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AnsweredSurvey } from 'core/models/answered.model';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-answered-result-dialog',
  standalone: true,
  templateUrl: './answered-result-dialog.component.html',
  styleUrl: './answered-result-dialog.component.scss',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule
  ],
})

export class AnsweredResultDialogComponent {

  entries: { key: string; value: string }[] = [];

  constructor(public dialogRef: MatDialogRef<AnsweredResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public answered: AnsweredSurvey) { }

  ngOnInit(): void {
    const raw = this.answered.data_surveys;

    try {
      const parsed = JSON.parse(raw); // convierte el string en objeto
      this.entries = Object.entries(parsed).map(([key, value]) => ({
        key,
        value: String(value)
      }));
    } catch (err) {
      console.error('data_surveys no es un JSON válido:', err);
    }
  }
  onClose(): void {
    this.dialogRef.close();
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString();
  }

  formatAnswer(value: string | string[]): string {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value;
  }
}
