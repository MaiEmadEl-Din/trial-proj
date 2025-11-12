import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonStyles } from './button-styles';

describe('ButtonStyles', () => {
  let component: ButtonStyles;
  let fixture: ComponentFixture<ButtonStyles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonStyles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonStyles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
