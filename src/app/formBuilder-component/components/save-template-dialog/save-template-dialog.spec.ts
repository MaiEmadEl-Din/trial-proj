import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTemplateDialog } from './save-template-dialog';

describe('SaveTemplateDialog', () => {
  let component: SaveTemplateDialog;
  let fixture: ComponentFixture<SaveTemplateDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveTemplateDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveTemplateDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
