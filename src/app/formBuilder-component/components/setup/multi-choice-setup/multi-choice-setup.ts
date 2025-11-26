import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { FormItem } from '../../../../../../public/utils/types';
import { FORM_ITEM } from '../../form-item.token';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-multi-choice-setup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    DragDropModule,
    CdkDropList
  ],
  templateUrl: './multi-choice-setup.html',
  styleUrl: './multi-choice-setup.scss'
})
export class MultiChoiceSetup {
  form: FormGroup;
  activeTab: 'Manual' | 'Query' | 'API' = 'Manual';
  focusedIndex: number | null = null;
  @Output() itemUpdated = new EventEmitter<FormItem>();

  constructor(
    private fb: FormBuilder,
    @Inject(FORM_ITEM) public item: FormItem
  ) {
    this.form = this.fb.group({
      label: [item.label || 'MultiChoice'],
      placeholder: [item.props?.['placeholder'] || 'Select options'],
      isRequired: [item.props?.['isRequired'] || false],

      options: this.fb.array(
        (item.props?.['options'] && item.props['options'].length > 0
          ? item.props['options']
          : [{ label: 'Option 1', isDefault: false }]
        ).map((opt: any) =>
          this.fb.group({
            label: [opt.label],
            isDefault: [opt.isDefault || false],
          })
        )
      ),

      queryConfig: this.fb.group({
        query: [item.props?.['queryConfig']?.query || ''],
        displayField: [item.props?.['queryConfig']?.displayField || ''],
      }),

      apiConfig: this.fb.group({
        url: [item.props?.['apiConfig']?.url || '', Validators.required],
        method: [item.props?.['apiConfig']?.method || 'GET'],
        authHeader: [item.props?.['apiConfig']?.authHeader || ''],
      }),
    });

    // Sync form → item
    this.form.valueChanges.subscribe((val) => {
      item.label = val.label;
      item.props = {
        ...item.props,
        placeholder: val.placeholder,
        isRequired: val.isRequired,
        options: val.options || ['Option 1'],
        queryConfig: val.queryConfig,
        apiConfig: val.apiConfig,
      };
      this.itemUpdated.emit(item);
    });
  }

  get options(): FormArray {
    return this.form.get('options') as FormArray;
  }

  get apiConfig(): FormGroup {
    return this.form.get('apiConfig') as FormGroup;
  }

  get queryConfig(): FormGroup {
    return this.form.get('queryConfig') as FormGroup;
  }

  setTab(tab: 'Manual' | 'Query' | 'API') {
    this.activeTab = tab;
  }

  addOption(label: string = '') {
    this.options.push(
      this.fb.group({
        label: [label],
        isDefault: [false],
      })
    );
  }

  setDefault(index: number) {
    this.options.controls.forEach((ctrl, i) => {
      ctrl.get('isDefault')?.setValue(i === index);
    });
    this.focusedIndex = null;
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  dropOption(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.options.controls, event.previousIndex, event.currentIndex);

    const reordered = this.options.controls.map(c => c.value);
    this.options.clear();

    reordered.forEach(opt => {
      this.options.push(this.fb.group({
        label: [opt.label],
      }));
    });
    this.focusedIndex = null;
  }
}
