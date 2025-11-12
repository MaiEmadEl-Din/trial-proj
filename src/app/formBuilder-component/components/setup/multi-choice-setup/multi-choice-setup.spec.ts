import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiChoiceSetup } from './multi-choice-setup';

describe('MultiChoiceSetup', () => {
  let component: MultiChoiceSetup;
  let fixture: ComponentFixture<MultiChoiceSetup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiChoiceSetup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiChoiceSetup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
