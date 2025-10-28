import { Component, ComponentRef, EventEmitter, Injector, Input, Output, SimpleChanges, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { FORM_ITEM } from '../../form-item.token';
import { TextStyles } from '../text-styles/text-styles';
import { FormItem } from '../../canvas-component/canvas-component';
import { DropdownStyles } from '../dropdown-styles/dropdown-styles';

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
  console.log('🔄 FieldStyles ngOnChanges triggered with item:', this.item);
  if (changes['item'] && this.item) {
    const map: Record<string, Type<any>> = {
      text: TextStyles,
      dropdown: DropdownStyles,
    };

    this.component = map[this.item.type];
    setTimeout(() => this.loadDynamicComponent());
  }
}


  private loadDynamicComponent() {
  console.log('🧱 loadDynamicComponent called');
  if (!this.dynamicContainer || !this.component) return;

  this.dynamicContainer.clear();

  const cleanItem = structuredClone(this.item);
  const compRef: ComponentRef<any> = this.dynamicContainer.createComponent(this.component);
  compRef.instance.item = cleanItem;

  console.log('🧩 Created:', this.component.name, 'with item:', cleanItem);

  compRef.instance.styleUpdated.subscribe((updatedItem: FormItem) => {
    console.log('🎯 styleUpdated caught in FieldStyles:', updatedItem);
    this.onStyleUpdated(updatedItem);
  });
}

  onStyleUpdated(updatedItem: FormItem) {
    if (!this.item.styles) this.item.styles = {};
    Object.assign(this.item.styles, updatedItem.styles);

    this.styleUpdated.emit(this.item);
  }

}
