import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileStyles } from './file-styles';

describe('FileStyles', () => {
  let component: FileStyles;
  let fixture: ComponentFixture<FileStyles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileStyles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileStyles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
