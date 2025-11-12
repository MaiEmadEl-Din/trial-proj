import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelperTextSetup } from './helper-text-setup';

describe('HelperTextSetup', () => {
  let component: HelperTextSetup;
  let fixture: ComponentFixture<HelperTextSetup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelperTextSetup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelperTextSetup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
