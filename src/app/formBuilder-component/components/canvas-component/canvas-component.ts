import { CdkDragDrop, CdkDragEnd, CdkDragMove, CdkDropList, DragDropModule, moveItemInArray, Point } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldSetup } from '../setup/field-setup/field-setup';
import { FieldStyles } from '../styles/field-styles/field-styles';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CanvasStateService } from '../../services/canvas.service';
import { BreadCrumbComponent } from '../../../shared/bread-crumb/bread-crumb.component';
import { FieldRenderer } from '../field-renderer/field-renderer';
import { VersionHistoryPanel } from "../version-history-panel/version-history-panel";
import { VersionHistoryService } from '../../services/version-history.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteDialog } from '../delete-dialog/delete-dialog';
import { SaveTemplateDialog } from '../save-template-dialog/save-template-dialog';
import {FormItem} from '../../../../../public/utils/types'

@Component({
  selector: 'app-canvas-component',
  standalone: true,
  imports: [
    CommonModule, DragDropModule, FormsModule, ReactiveFormsModule,
    FieldSetup, FieldStyles,
    MatIconModule, MatFormFieldModule, MatSelectModule, MatInputModule,
    MatButtonModule, MatCheckboxModule, MatRadioModule, MatSlideToggleModule,
    BreadCrumbComponent,
    FieldRenderer,
    VersionHistoryPanel,
    MatDialogModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './canvas-component.html',
  styleUrl: './canvas-component.scss'
})
export class CanvasComponent {
  canvasState = inject(CanvasStateService);
  versionHistory = inject(VersionHistoryService);
  router = inject(Router);
  dialog = inject(MatDialog);
  @ViewChild('paletteList') paletteList!: CdkDropList;

  constructor() {
    this.canvasState.formData.set(this.router.getCurrentNavigation()?.extras.state?.['formData']);
  }

  paletteItems: FormItem[] = [
    { type: 'text', label: 'Text Field', icon: 'esc-icons:text-input', props: { placeholder: 'Enter text' } },
    { type: 'button', label: 'Button', icon: 'esc-icons:button' },
    { type: 'textarea', label: 'Text Area', icon: 'esc-icons:text-area', props: { placeholder: 'Enter description' } },
    { type: 'dropdown', label: 'Drop Down', icon: 'esc-icons:arrow-down' },
    { type: 'multiple-choice', label: 'Multiple Choice', icon: 'esc-icons:square-check' },
    { type: 'radio', label: 'Radio Button', icon: 'esc-icons:circle-check' },
    { type: 'toggle', label: 'Toggle', icon: 'esc-icons:toggle' },
    { type: 'datetime', label: 'Date & Time', icon: 'esc-icons:calendar-clock' },
    { type: 'file', label: 'File Upload', icon: 'esc-icons:upload' },
    { type: 'helper', label: 'Helper Text', icon: 'esc-icons:quote' },
    { type: 'text-condition', label: 'Condition', icon: 'esc-icons:text-change' }
  ];


  setFont(font: string) {
    this.canvasState.formStyles.update(s => ({ ...s, fontFamily: font }));
  }

  setFormAlignment(a: 'justify-start' | 'justify-center' | 'justify-end') {
    this.canvasState.formStyles.update(s => ({ ...s, alignment: a }));
  }

  applyGrid(grid: string) {
    this.canvasState.formStyles.update(s => ({ ...s, gridColumns: grid }));
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '600px',
      backdropClass: 'bg-black/50',
      data: { message: 'Deleting this page is permanent. All content will be lost and can’t be recovered.' }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        console.log('con', confirmed);
        console.log('Page deleted ');
      }
    });
  }

  openSaveTemplateDialog() {
    const ref = this.dialog.open(SaveTemplateDialog, {
      width: '520px',
      backdropClass: 'bg-black/40',
    });

    ref.afterClosed().subscribe(value => {
      if (value) {
        console.log('Template saved as:', value);
      }
    });
  }

}
