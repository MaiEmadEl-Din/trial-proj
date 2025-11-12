import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormItem } from '../../../../../../public/utils/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-styles',
  imports: [CommonModule],
  templateUrl: './button-styles.html',
  styleUrl: './button-styles.scss'
})
export class ButtonStyles {
  @Input() item!: FormItem;
  @Output() styleUpdated = new EventEmitter<FormItem>();
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
      value = eventOrValue;
    }

    const numericStyles = [
      'fontSize',
      'padding',
      'margin',
      'borderRadius',
      'borderWidth',
      'gap',
    ];

    let targetStyles =
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

  parseNumber(value: string | number | undefined, fallback = 1): number {
    if (!value) return fallback;
    const parsed = parseInt(value.toString(), 10);
    return isNaN(parsed) ? fallback : parsed;
  }
}
