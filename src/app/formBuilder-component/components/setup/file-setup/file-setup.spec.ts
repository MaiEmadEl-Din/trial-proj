import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSetup } from './file-setup';

describe('FileSetup', () => {
  let component: FileSetup;
  let fixture: ComponentFixture<FileSetup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileSetup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileSetup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
