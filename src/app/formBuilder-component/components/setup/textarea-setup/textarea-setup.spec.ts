import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaSetup } from './textarea-setup';

describe('TextareaSetup', () => {
  let component: TextareaSetup;
  let fixture: ComponentFixture<TextareaSetup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextareaSetup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextareaSetup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
