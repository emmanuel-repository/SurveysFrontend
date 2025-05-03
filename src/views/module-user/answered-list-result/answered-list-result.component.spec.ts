import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsweredListResultComponent } from './answered-list-result.component';

describe('AnsweredListResultComponent', () => {
  let component: AnsweredListResultComponent;
  let fixture: ComponentFixture<AnsweredListResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnsweredListResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnsweredListResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
