import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormItem } from '../../../../../../public/utils/types';
import { FORM_ITEM } from '../../form-item.token';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-setup',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './file-setup.html',
  styleUrl: './file-setup.scss'
})
export class FileSetup {
  form: FormGroup;
  @Output() itemUpdated = new EventEmitter<FormItem>();

  fileTypes = [
    { label: 'Any', value: 'any' },
    { label: 'PDF', value: '.pdf' },
    { label: 'Images', value: '.jpg,.jpeg,.png,.gif,.webp,.svg' },
    { label: 'Spreadsheets', value: '.xls,.xlsx,.csv' },
    { label: 'Audio', value: '.mp3,.wav,.ogg,.m4a' },
    { label: 'Video', value: '.mp4,.avi,.mov,.mkv,.webm' },
    { label: 'Documents', value: '.doc,.docx,.txt,.rtf,.odt,.pdf' },
  ];
  constructor(
    private fb: FormBuilder,
    @Inject(FORM_ITEM) public item: FormItem
  ) {
    this.form = this.fb.group({
      label: [item.label || ''],
      isRequired: [item.props?.['isRequired'] || false],
      maxFiles: [item.props?.['maxFiles'] || 1],
      maxFileSize: [item.props?.['maxFileSize'] || 5],
      fileTypes: [item.props?.['fileTypes'] || []],
      apiValidation: [item.props?.['apiValidation'] || ''],
    });

    this.form.valueChanges.subscribe(val => {
      item.label = val.label;
      item.props = {
        ...item.props,
        isRequired: val.isRequired,
        maxFiles: val.maxFiles,
        maxFileSize: val.maxFileSize,
        fileTypes: val.fileTypes,
        apiValidation: val.apiValidation,
      };
      this.itemUpdated.emit(item);
    });
  }

  toggleFileType(type: string) {
    const fileTypes = this.form.value.fileTypes || [];
    if (fileTypes.includes(type)) {
      this.form.patchValue({ fileTypes: fileTypes.filter((t: string) => t !== type) });
    } else {
      this.form.patchValue({ fileTypes: [...fileTypes, type] });
    }
  }
}
