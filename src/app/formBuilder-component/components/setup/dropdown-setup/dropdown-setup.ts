import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormItem } from '../../../../../../public/utils/types';
import { FORM_ITEM } from '../../form-item.token';
import { CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dropdown-setup',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DragDropModule, CdkDropList, MatIconModule],
  templateUrl: './dropdown-setup.html',
  styleUrl: './dropdown-setup.scss'
})
export class DropdownSetup {
  form: FormGroup;
  activeTab: 'Manual' | 'Query' | 'API' = 'Manual';
  focusedIndex: number | null = null;

  @Output() itemUpdated = new EventEmitter<FormItem>();

  constructor(
    private fb: FormBuilder,
    @Inject(FORM_ITEM) public item: FormItem
  ) {
    this.form = this.fb.group({
      label: [item.label || 'Dropdown'],
      placeholder: [item.props?.['placeholder'] || 'Select an option'],
      isMultiselect: [item.props?.['isMultiselect'] || false],
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
        isMultiselect: val.isMultiselect,
        required: val.required,
        options: val.options,
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

  setDefault(index: number) {
    this.options.controls.forEach((ctrl, i) => {
      ctrl.get('isDefault')?.setValue(i === index);
    });
    this.focusedIndex = null;    
  }

  addOption(label: string = '') {
    this.options.push(
      this.fb.group({
        label: [label],
        isDefault: [false],
      })
    );
  }

  removeOption(index: number) {
    this.options.removeAt(index);
    this.focusedIndex = null;
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
