import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonSetup } from './radio-button-setup';

describe('RadioButtonSetup', () => {
  let component: RadioButtonSetup;
  let fixture: ComponentFixture<RadioButtonSetup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioButtonSetup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioButtonSetup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
