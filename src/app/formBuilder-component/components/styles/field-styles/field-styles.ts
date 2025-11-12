import { Component, ComponentRef, EventEmitter, Injector, Input, Output, SimpleChanges, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { FORM_ITEM } from '../../form-item.token';
import { TextStyles } from '../text-styles/text-styles';
import { FormItem } from '../../../../../../public/utils/types';
import { DropdownStyles } from '../dropdown-styles/dropdown-styles';
import { TextareaStyles } from '../textarea-styles/textarea-styles';
import { ButtonStyles } from '../button-styles/button-styles';
import { MultiChoiceStyles } from '../multi-choice-styles/multi-choice-styles';
import { RadioButtonStyles } from '../radio-button-styles/radio-button-styles';
import { ToggleStyles } from '../toggle-styles/toggle-styles';
import { HelperTextStyles } from '../helper-text-styles/helper-text-styles';
import { ConditionsAcceptanceStyles } from '../conditions-acceptance-styles/conditions-acceptance-styles';
import { DateTimeStyles } from '../date-time-styles/date-time-styles';
import { FileStyles } from '../file-styles/file-styles';

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
        textarea: TextareaStyles,
        button: ButtonStyles,
        'multiple-choice': MultiChoiceStyles,
        radio: RadioButtonStyles,
        toggle: ToggleStyles,
        helper: HelperTextStyles,
        "text-condition": ConditionsAcceptanceStyles,
        datetime: DateTimeStyles,
        file: FileStyles
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
