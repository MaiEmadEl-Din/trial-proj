import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelperTextStyles } from './helper-text-styles';

describe('HelperTextStyles', () => {
  let component: HelperTextStyles;
  let fixture: ComponentFixture<HelperTextStyles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelperTextStyles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelperTextStyles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
