import { ChangeDetectorRef, Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FORM_ITEM } from '../../form-item.token';
import { FormItem } from '../../../../../../public/utils/types';

@Component({
  selector: 'app-text-setup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './text-setup.html',
  styleUrl: './text-setup.scss'
})
export class TextSetup {
  form: FormGroup;
  @Output() itemUpdated = new EventEmitter<FormItem>();

  constructor(
    private fb: FormBuilder,
    @Inject(FORM_ITEM) public item: FormItem
  ) {        
    this.form = this.fb.group({
      inputType: [item?.['type'] || 'text'],
      label: [item.label || ''],
      placeholder: [item.props?.['placeholder'] || ''],
      isRequired: [item.props?.['isRequired'] || false],
      apiValidation: [item.props?.['apiValidation'] || ''],
      maxLength: [item.props?.['maxLength'] || '50'],
    });

    this.form.valueChanges.subscribe(val => {
      item.label = val.label;
      item.props = {
        ...item.props,
        inputType: val.inputType,
        placeholder: val.placeholder,
        isRequired: val.isRequired,
        apiValidation: val.apiValidation,
        maxLength: val.maxLength,
      };      
      this.itemUpdated.emit(item);
    });
  }
}
