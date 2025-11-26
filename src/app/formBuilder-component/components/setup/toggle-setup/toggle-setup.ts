import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormItem } from '../../../../../../public/utils/types';
import { FORM_ITEM } from '../../form-item.token';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toggle-setup',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './toggle-setup.html',
  styleUrl: './toggle-setup.scss'
})
export class ToggleSetup {
  form: FormGroup;
  @Output() itemUpdated = new EventEmitter<FormItem>();

  constructor(
    private fb: FormBuilder,
    @Inject(FORM_ITEM) public item: FormItem
  ) {
    this.form = this.fb.group({
      label: [item.label || 'Toggle Label'],
      defaultValue: [item.props?.['defaultValue'] ?? true],
      isRequired: [item.props?.['isRequired'] || false],
      apiValidation: [item.props?.['apiValidation'] || ''],
    });

    this.form.valueChanges.subscribe((val) => {
      item.label = val.label;
      item.props = {
        ...item.props,
        defaultValue: val.defaultValue,
        isRequired: val.isRequired,
        apiValidation: val.apiValidation,
      };
      this.itemUpdated.emit(item);
    });
  }

  openApiValidation() {
    console.log('Open API Validation for:', this.form.value.label);
  }

  setDefault(value: boolean) {
    this.form.patchValue({ defaultValue: value });
  }
}
