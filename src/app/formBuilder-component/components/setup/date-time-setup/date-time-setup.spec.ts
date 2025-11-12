import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeSetup } from './date-time-setup';

describe('DateTimeSetup', () => {
  let component: DateTimeSetup;
  let fixture: ComponentFixture<DateTimeSetup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateTimeSetup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateTimeSetup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
