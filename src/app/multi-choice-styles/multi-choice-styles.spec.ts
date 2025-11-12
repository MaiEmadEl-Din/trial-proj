import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiChoiceStyles } from './multi-choice-styles';

describe('MultiChoiceStyles', () => {
  let component: MultiChoiceStyles;
  let fixture: ComponentFixture<MultiChoiceStyles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiChoiceStyles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiChoiceStyles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
