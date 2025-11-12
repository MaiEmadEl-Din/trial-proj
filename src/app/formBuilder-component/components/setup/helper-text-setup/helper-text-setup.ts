import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormItem } from '../../../../../../public/utils/types';
import { FORM_ITEM } from '../../form-item.token';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-helper-text-setup',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './helper-text-setup.html',
  styleUrl: './helper-text-setup.scss'
})
export class HelperTextSetup {
  form: FormGroup;
  @Output() itemUpdated = new EventEmitter<FormItem>();

  constructor(
    private fb: FormBuilder,
    @Inject(FORM_ITEM) public item: FormItem
  ) {
    this.form = this.fb.group({
      content: [item.props?.['content']],
    });

    this.form.valueChanges.subscribe(val => {
      item.props = {
        ...item.props,
        content: val.content,
      };
      this.itemUpdated.emit(item);
    });
  }
}
