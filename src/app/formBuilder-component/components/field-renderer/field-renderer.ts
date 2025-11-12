import { Component, Input } from '@angular/core';
import { FormItem } from '../../../../../public/utils/types';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-field-renderer',
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule, NzTimePickerModule, NzDatePickerModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './field-renderer.html',
  styleUrl: './field-renderer.scss'
})
export class FieldRenderer {
  @Input() it!: FormItem;
  selectedValues: string[] = [];
  selectedValuesMap: Record<string, string[] | string | null> = {};


  applyHover(target: any, item?: FormItem) {
    // For options → direct property
    if (target && !item) {
      target.isHovering = true;
    }
    // For single items (like text fields)
    else if (item?.styles) {
      item.styles['isHovering'] = true;
    }
  }

  removeHover(target: any, item?: FormItem) {
    if (target && !item) {
      target.isHovering = false;
    } else if (item?.styles) {
      item.styles['isHovering'] = false;
    }
  }

  mergeStyles(item: FormItem, target?: any): Record<string, any> {
    if (!item.styles) return {};

    const base = { ...item.styles };
    const hover = item.styles.hover || {};
    const selected = item.styles.selected || {};

    delete base.hover;
    delete base.selected;
    delete base['isHovering'];

    const isOptionHovering = target?.isHovering;
    const isItemHovering = item.styles['isHovering'];

    const selectedState = this.selectedValuesMap[item.label!];

    const isSelected =
      selectedState === target?.label ||
      (Array.isArray(selectedState) && selectedState.includes(target?.label));

    if (isOptionHovering || isItemHovering) return { ...base, ...hover };

    if (target && isSelected) return { ...base, ...selected };

    return base;
  }

  getButtonType(type?: string): string {
    switch (type?.toLowerCase()) {
      case 'primary':
        return 'bg-primary-500 text-white';
      case 'secondary':
        return 'bg-primary-50 text-primary-500';
      case 'outline':
        return 'border border-primary-600 text-primary-600';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  handleFileSelection(event: Event, item: FormItem) {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files || []);

    item.props = { ...item.props, errorMessage: null };

    // Check file count
    if (item.props?.maxFiles && files.length > item.props.maxFiles) {
      input.value = '';
      item.props = {
        ...item.props,
        filesExceedLimitMessage: `You can only upload up to ${item.props.maxFiles} file(s).`,
      };
      return;
    }

    // Check file size
    if (item.props?.maxFileSize && files.some(file => file.size / (1024 * 1024) > item.props?.maxFileSize!)) {
      input.value = '';
      item.props = {
        ...item.props,
        filesExceedLimitMessage: `One or more files exceed the maximum size of ${item.props.maxFileSize} MB.`,
      };
      return;
    }

    item.props = {
      ...item.props,
      selectedFiles: files,
      filesExceedLimitMessage: null,
    };
  }


  onSelectionChange(event: any, optionLabel: string, item: FormItem, type: 'radio' | 'checkbox' | 'dropdown') {
    const key = item.label;

    if (type === 'dropdown' || type === 'radio') {
      this.selectedValuesMap[key!] = optionLabel;
      return;
    }

    if (type === 'checkbox') {
      const current = Array.isArray(this.selectedValuesMap[key!])
        ? [...(this.selectedValuesMap[key!] as string[])]
        : [];

      if (event.checked) {
        if (!current.includes(optionLabel)) current.push(optionLabel);
      } else {
        const index = current.indexOf(optionLabel);
        if (index !== -1) current.splice(index, 1);
      }

      this.selectedValuesMap[key!] = current;
    }
  }

  updateToggle(it: FormItem, newValue: boolean) {
    it.props = { ...it.props, defaultValue: newValue };
  }

}
