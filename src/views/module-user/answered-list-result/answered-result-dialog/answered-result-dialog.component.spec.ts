import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsweredResultDialogComponent } from './answered-result-dialog.component';

describe('AnsweredResultDialogComponent', () => {
  let component: AnsweredResultDialogComponent;
  let fixture: ComponentFixture<AnsweredResultDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnsweredResultDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnsweredResultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
