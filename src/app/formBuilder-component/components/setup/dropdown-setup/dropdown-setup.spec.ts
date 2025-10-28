import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownSetup } from './dropdown-setup';

describe('DropdownSetup', () => {
  let component: DropdownSetup;
  let fixture: ComponentFixture<DropdownSetup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownSetup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownSetup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
