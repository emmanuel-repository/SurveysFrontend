import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsweredComponent } from './answered.component';

describe('AnsweredComponent', () => {
  let component: AnsweredComponent;
  let fixture: ComponentFixture<AnsweredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnsweredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnsweredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
