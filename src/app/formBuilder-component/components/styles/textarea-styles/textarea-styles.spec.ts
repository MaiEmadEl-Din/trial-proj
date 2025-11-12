import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaStyles } from './textarea-styles';

describe('TextareaStyles', () => {
  let component: TextareaStyles;
  let fixture: ComponentFixture<TextareaStyles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextareaStyles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextareaStyles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
