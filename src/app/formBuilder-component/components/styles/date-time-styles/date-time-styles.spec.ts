import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeStyles } from './date-time-styles';

describe('DateTimeStyles', () => {
  let component: DateTimeStyles;
  let fixture: ComponentFixture<DateTimeStyles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateTimeStyles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateTimeStyles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
