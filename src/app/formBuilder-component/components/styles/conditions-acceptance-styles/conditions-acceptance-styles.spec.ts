import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsAcceptanceStyles } from './conditions-acceptance-styles';

describe('ConditionsAcceptanceStyles', () => {
  let component: ConditionsAcceptanceStyles;
  let fixture: ComponentFixture<ConditionsAcceptanceStyles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionsAcceptanceStyles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionsAcceptanceStyles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
