import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSetup } from './button-setup';

describe('ButtonSetup', () => {
  let component: ButtonSetup;
  let fixture: ComponentFixture<ButtonSetup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSetup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonSetup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
