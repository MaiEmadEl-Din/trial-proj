import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormItem } from '../../../../../../public/utils/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-time-styles',
  imports: [
    CommonModule
  ],
  templateUrl: './date-time-styles.html',
  styleUrl: './date-time-styles.scss'
})
export class DateTimeStyles {
  @Input() item!: FormItem;
  @Output() styleUpdated = new EventEmitter<FormItem>();
  window = window;
  activeTab: 'default' | 'hover' = 'default';


  updateStyle(key: string, eventOrValue: Event | string | number) {
    if (!this.item.styles) this.item.styles = {};

    let value: any;

    if (eventOrValue instanceof Event) {
      const target = eventOrValue.target as HTMLInputElement | HTMLSelectElement;
      if (target.type === 'checkbox') {
        value = (target as HTMLInputElement).checked;
      } else {
        value = target.value;
      }
    } else {
      value = eventOrValue; // direct value like 'ltr' or 'rtl'
    }

    const numericStyles = ['fontSize', 'padding', 'margin', 'borderRadius', 'borderWidth', 'gap'];

    // --- Handle hover or default styles ---
    let targetStyles: any =
      this.activeTab === 'hover'
        ? (this.item.styles.hover ??= {})
        : this.item.styles;

    if (numericStyles.includes(key)) {
      const num = Number(value);
      if (!isNaN(num)) {
        targetStyles[key] = `${num}px`;
      }
    } else {
      targetStyles[key] = value;
    }

    this.styleUpdated.emit(this.item);
  }



  parseNumber(value: string | number | undefined, fallback: number = 1): number {
    if (!value) return fallback;
    const parsed = parseInt(value.toString(), 10);
    return isNaN(parsed) ? fallback : parsed;
  }
}
