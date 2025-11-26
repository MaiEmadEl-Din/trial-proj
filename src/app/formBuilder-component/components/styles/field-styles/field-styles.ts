import { Component, ComponentRef, EventEmitter, Injector, Input, Output, SimpleChanges, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { TextStyles } from '../text-styles/text-styles';
import { FormItem } from '../../../../../../public/utils/types';

@Component({
  selector: 'app-field-styles',
  imports: [],
  templateUrl: './field-styles.html',
  styleUrl: './field-styles.scss'
})
export class FieldStyles {
  @Input() item!: FormItem;
  @Output() styleUpdated = new EventEmitter<FormItem>();

  @ViewChild('dynamicContainer', { read: ViewContainerRef })
  dynamicContainer!: ViewContainerRef;

  component!: Type<any>;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item'] && this.item) {
      const map: Record<string, Type<any>> = {
        text: TextStyles,
        dropdown: TextStyles,
        textarea: TextStyles,
        button: TextStyles,
        'multiple-choice': TextStyles,
        radio: TextStyles,
        toggle: TextStyles,
        helper: TextStyles,
        "text-condition": TextStyles,
        datetime: TextStyles,
        file: TextStyles
      };

      this.component = map[this.item.type];
      setTimeout(() => this.loadDynamicComponent());
    }
  }


  private loadDynamicComponent() {
    if (!this.dynamicContainer || !this.component) return;

    this.dynamicContainer.clear();

    const cleanItem = structuredClone(this.item);
    const compRef: ComponentRef<any> = this.dynamicContainer.createComponent(this.component);
    compRef.instance.item = cleanItem;
    compRef.instance.styleUpdated.subscribe((updatedItem: FormItem) => {
      this.onStyleUpdated(updatedItem);
    });
  }

  onStyleUpdated(updatedItem: FormItem) {
    if (!this.item.styles) this.item.styles = {};
    Object.assign(this.item.styles, updatedItem.styles);

    console.log('updated style', updatedItem);
    
    this.styleUpdated.emit(this.item);
  }

}
