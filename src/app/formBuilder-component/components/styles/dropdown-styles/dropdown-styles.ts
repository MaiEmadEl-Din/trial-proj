import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormItem } from '../../../../../../public/utils/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown-styles',
  imports: [
    CommonModule
  ],
  templateUrl: './dropdown-styles.html',
  styleUrl: './dropdown-styles.scss'
})
export class DropdownStyles {
  @Input() item!: FormItem;
  @Output() styleUpdated = new EventEmitter<FormItem>();

  activeTab: 'default' | 'selected' | 'hover' = 'default';

  updateStyle(key: string, eventOrValue: Event | string | number) {
    if (!this.item.styles) this.item.styles = {};

    let value: any;
    if (eventOrValue instanceof Event) {
      const target = eventOrValue.target as HTMLInputElement | HTMLSelectElement;
      value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    } else {
      value = eventOrValue;
    }

    const numericStyles = ['fontSize', 'borderWidth', 'borderRadius'];

    // --- Target correct tab style ---
    const styleTarget =
      this.activeTab === 'selected'
        ? (this.item.styles['selected'] ??= {})
        : this.activeTab === 'hover'
          ? (this.item.styles['hover'] ??= {})
          : this.item.styles;

    if (numericStyles.includes(key)) {
      const num = Number(value);
      if (!isNaN(num)) styleTarget[key] = `${num}px`;
    } else {
      styleTarget[key] = value;
    }

    this.styleUpdated.emit(this.item);
  }

  parseNumber(value: string | number | undefined, fallback = 1): number {
    if (!value) return fallback;
    const parsed = parseInt(value.toString(), 10);
    return isNaN(parsed) ? fallback : parsed;
  }
}
