import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsweredResultsComponent } from './answered-results.component';

describe('AnsweredResultsComponent', () => {
  let component: AnsweredResultsComponent;
  let fixture: ComponentFixture<AnsweredResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnsweredResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnsweredResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
