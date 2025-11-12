import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormItem } from '../../../../../../public/utils/types';
import { FORM_ITEM } from '../../form-item.token';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-textarea-setup',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './textarea-setup.html',
  styleUrl: './textarea-setup.scss'
})
export class TextareaSetup {
  form: FormGroup;
  @Output() itemUpdated = new EventEmitter<FormItem>();

  constructor(
    private fb: FormBuilder,
    @Inject(FORM_ITEM) public item: FormItem
  ) {
    this.form = this.fb.group({
      label: [item.label || ''],
      placeholder: [item.props?.['placeholder'] || ''],
      required: [item.props?.['required'] || false],
      apiValidation: [item.props?.['apiValidation'] || ''],
      maxLength: [item.props?.['maxLength'] || '100'],
    });

    this.form.valueChanges.subscribe(val => {
      item.label = val.label;
      item.props = {
        ...item.props,
        placeholder: val.placeholder,
        rows: val.rows,
        required: val.required,
        apiValidation: val.apiValidation,
        maxLength: val.maxLength,
      };
      this.itemUpdated.emit(item);
    });
  }

}
