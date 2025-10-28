import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldStyles } from './field-styles';

describe('FieldStyles', () => {
  let component: FieldStyles;
  let fixture: ComponentFixture<FieldStyles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldStyles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldStyles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
