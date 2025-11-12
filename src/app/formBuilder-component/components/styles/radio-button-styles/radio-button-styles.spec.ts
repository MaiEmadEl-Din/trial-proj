import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonStyles } from './radio-button-styles';

describe('RadioButtonStyles', () => {
  let component: RadioButtonStyles;
  let fixture: ComponentFixture<RadioButtonStyles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioButtonStyles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioButtonStyles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
