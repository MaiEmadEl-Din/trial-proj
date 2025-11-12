import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleStyles } from './toggle-styles';

describe('ToggleStyles', () => {
  let component: ToggleStyles;
  let fixture: ComponentFixture<ToggleStyles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleStyles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleStyles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
