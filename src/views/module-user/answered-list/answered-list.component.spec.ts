import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsweredListComponent } from './answered-list.component';

describe('AnsweredComponent', () => {
  let component: AnsweredListComponent;
  let fixture: ComponentFixture<AnsweredListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnsweredListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnsweredListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
