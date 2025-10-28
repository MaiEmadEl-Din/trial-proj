import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicdataList } from './basicdata-list';

describe('BasicdataList', () => {
  let component: BasicdataList;
  let fixture: ComponentFixture<BasicdataList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicdataList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicdataList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
