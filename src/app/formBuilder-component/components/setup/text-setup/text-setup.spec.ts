import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSetup } from './text-setup';

describe('TextSetup', () => {
  let component: TextSetup;
  let fixture: ComponentFixture<TextSetup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextSetup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextSetup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
