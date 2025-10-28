import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldSetup } from './field-setup';

describe('FieldSetup', () => {
  let component: FieldSetup;
  let fixture: ComponentFixture<FieldSetup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldSetup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldSetup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
