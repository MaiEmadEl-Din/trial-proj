import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormItem } from '../../../../../../public/utils/types';
import { FORM_ITEM } from '../../form-item.token';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-setup',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './button-setup.html',
  styleUrl: './button-setup.scss'
})
export class ButtonSetup {
  form: FormGroup;
  @Output() itemUpdated = new EventEmitter<FormItem>();

  buttonTypes = ['primary', 'secondary', 'outline'];
  buttonFunctions = ['submit', 'reset', 'save'];
  iconPositions = ['On Left', 'On Right', 'None'];

  constructor(
    private fb: FormBuilder,
    @Inject(FORM_ITEM) public item: FormItem
  ) {
    this.form = this.fb.group({
      buttonType: [item.props?.['buttonType'] || 'primary'],
      label: [item.props?.['buttonText'] || 'Button'],
      type: [item.props?.['type'] || 'submit'],
      iconPosition: [item.props?.['iconPosition'] || 'On Right'],
      apiValidation: [item.props?.['apiValidation'] || ''],
      iconFile: [null],
    });

    this.form.valueChanges.subscribe(val => {
      item.label = val.label;
      item.props = {
        ...item.props,
        buttonType: val.buttonType,
        type: val.type,
        iconPosition: val.iconPosition,
        apiValidation: val.apiValidation,
        iconFile: val.iconFile,
      };
      this.itemUpdated.emit(item);
    });
  }

  // onFileSelected(event: Event) {
  //   const fileInput = event.target as HTMLInputElement;
  //   if (fileInput.files?.length) {
  //     const file = fileInput.files[0];
  //     this.form.patchValue({ iconFile: file });
  //     this.form.get('iconFile')?.markAsDirty();
  //   }
  // }


  uploadedIconUrl: string | null = null;

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files?.length) {
      const file = fileInput.files[0];

      // Update the form control
      this.form.patchValue({ iconFile: file });
      this.form.get('iconFile')?.markAsDirty();

      // Free old URL if exists
      if (this.uploadedIconUrl) {
        URL.revokeObjectURL(this.uploadedIconUrl);
      }

      // Create preview URL
      this.uploadedIconUrl = URL.createObjectURL(file);

      // Immediately update item with preview URL
      this.item.props = {
        ...this.item.props,
        iconPreview: this.uploadedIconUrl,
      };
      this.itemUpdated.emit(this.item);
    }
  }
}
