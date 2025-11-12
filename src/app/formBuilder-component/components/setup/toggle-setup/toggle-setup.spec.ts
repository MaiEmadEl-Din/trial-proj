import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleSetup } from './toggle-setup';

describe('ToggleSetup', () => {
  let component: ToggleSetup;
  let fixture: ComponentFixture<ToggleSetup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleSetup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleSetup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
