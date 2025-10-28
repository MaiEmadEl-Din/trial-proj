import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownStyles } from './dropdown-styles';

describe('DropdownStyles', () => {
  let component: DropdownStyles;
  let fixture: ComponentFixture<DropdownStyles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownStyles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownStyles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
