import { Component, Inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-save-template-dialog',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './save-template-dialog.html',
  styleUrl: './save-template-dialog.scss'
})
export class SaveTemplateDialog {
  templateName = new FormControl('', { nonNullable: true, validators: [Validators.required] });

  constructor(
    private dialogRef: MatDialogRef<SaveTemplateDialog>) {}

  close() {
    this.dialogRef.close();
  }

  save() {
    if (this.templateName.invalid) return;
    this.dialogRef.close(this.templateName.value);
  }

}
