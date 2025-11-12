import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionHistoryPanel } from './version-history-panel';

describe('VersionHistoryPanel', () => {
  let component: VersionHistoryPanel;
  let fixture: ComponentFixture<VersionHistoryPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersionHistoryPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersionHistoryPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
