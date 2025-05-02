import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveysDialogComponent } from './surveys-dialog.component';

describe('SurveysDialogComponent', () => {
  let component: SurveysDialogComponent;
  let fixture: ComponentFixture<SurveysDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveysDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveysDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
