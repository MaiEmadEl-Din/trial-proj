import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsAcceptanceSetup } from './conditions-acceptance-setup';

describe('ConditionsAcceptanceSetup', () => {
  let component: ConditionsAcceptanceSetup;
  let fixture: ComponentFixture<ConditionsAcceptanceSetup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionsAcceptanceSetup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionsAcceptanceSetup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
