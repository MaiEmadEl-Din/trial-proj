import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormItem } from '../../../../../../public/utils/types';
import { FORM_ITEM } from '../../form-item.token';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-time-setup',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './date-time-setup.html',
  styleUrl: './date-time-setup.scss'
})
export class DateTimeSetup {
  form: FormGroup;
  @Output() itemUpdated = new EventEmitter<FormItem>();

  constructor(
    private fb: FormBuilder,
    @Inject(FORM_ITEM) public item: FormItem
  ) {
    this.form = this.fb.group({
      fieldName: [item.label || ''],
      dateType: [item.props?.['dateType'] || 'datetime'], // 'datetime', 'date', 'time'
      timeSelection: [item.props?.['timeSelection'] || 'specific'], // 'specific' | 'range'
      dateSelection: [item.props?.['dateSelection'] || 'specific'], // 'specific' | 'range'
      timeZone: [item.props?.['timeZone'] || 'local'],
      timeFormat: [item.props?.['timeFormat'] || '24h'],
      dateFormat: [item.props?.['dateFormat'] || 'MM-DD-YYYY'],
      required: [item.props?.['required'] || false],
    });

    this.form.valueChanges.subscribe((val) => {
      item.label = val.fieldName;
      item.props = {
        ...item.props,
        ...val,
      };
      this.itemUpdated.emit(item);
    });
  }
}
