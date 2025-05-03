import { Component, Inject, numberAttribute, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Question, QuestionFormRequest, QuestionOption } from 'core/models/question.model';
import { QuestionService } from 'core/services/question.service';

@Component({
  selector: 'app-question-dialog',
  standalone: true,
  templateUrl: './question-dialog.component.html',
  styleUrl: './question-dialog.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule
  ],
})

export class QuestionDialogComponent {

  questionForm: FormGroup = new FormGroup({});
  isEditMode: boolean = false;
  showOptionsField: boolean = false;
  options: QuestionOption[] = [];
  newOption: QuestionOption = { value: '', text: '' };

  questionTypes = [
    { value: 'text', label: 'Texto' },
    { value: 'radio', label: 'Opción única' },
    // { value: 'checkbox', label: 'Múltiple selección' },
    // { value: 'select', label: 'Lista desplegable' }
  ];

  constructor(private fb: FormBuilder, private questionService: QuestionService, private dialogRef: MatDialogRef<QuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { question: Question | null, surveyId: number }) {

    this.questionForm = this.fb.group(this.questionService.getFormValidateQuestions());
  }

  ngOnInit(): void {

    if (this.data.question) {

      this.isEditMode = true;
      const question = this.data.question;

      this.questionForm.patchValue({
        ask: question.ask,
        type_ask: question.type_ask,
        required: !!question.required
      });

      if (question.options) {
        this.options = JSON.parse(question.options);
        this.showOptionsField = true;
      }

    }

    this.questionForm.get('type_ask')?.valueChanges.subscribe(value => {
      this.showOptionsField = ['radio', 'checkbox', 'select'].includes(value);

      if (!this.showOptionsField) {
        this.options = [];
        this.questionForm.get('options')?.setValue('');
      }

    });
  }

  onSubmit(): void {
    if (!this.questionForm.valid) return;

    const formValue = this.questionForm.value;

      const payload = {
        id: this.data.question?.id || 0,
        ask: formValue.ask,
        type_ask: formValue.type_ask,
        required: formValue.required ? 1 : 0,
        options: this.showOptionsField ? formValue.options : null,
        surveys_id: this.data.surveyId
      };

      if (this.isEditMode && this.data.question) this.edit(this.data.question.id, payload);
      else this.save(payload);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  addOption(): void {
    if (this.newOption.value && this.newOption.text) {
      this.options.push({ ...this.newOption });
      this.newOption = { value: '', text: '' };
      this.updateOptionsField();
    }
  }

  removeOption(index: number): void {
    this.options.splice(index, 1);
    this.updateOptionsField();
  }

  updateOptionsField(): void {
    this.questionForm.get('options')?.setValue(JSON.stringify(this.options));
  }

  private save(payload: QuestionFormRequest): void {
    this.questionService.createQuestion(payload).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error('Error creating question:', err)
    });
  }

  private edit(id: number, payload: QuestionFormRequest): void {
    this.questionService.updateQuestion(id, payload).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error('Error updating question:', err)
    });
  }

}
