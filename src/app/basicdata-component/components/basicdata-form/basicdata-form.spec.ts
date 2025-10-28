import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicdataForm } from './basicdata-form';

describe('BasicdataForm', () => {
  let component: BasicdataForm;
  let fixture: ComponentFixture<BasicdataForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicdataForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicdataForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
