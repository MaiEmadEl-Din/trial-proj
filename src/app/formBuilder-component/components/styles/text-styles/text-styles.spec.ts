import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextStyles } from './text-styles';

describe('TextStyles', () => {
  let component: TextStyles;
  let fixture: ComponentFixture<TextStyles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextStyles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextStyles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
