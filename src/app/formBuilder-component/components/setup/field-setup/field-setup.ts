import {
  Component,
  Injector,
  Input,
  SimpleChanges,
  Type,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextSetup } from '../text-setup/text-setup';
import { DropdownSetup } from '../dropdown-setup/dropdown-setup';
import { TextareaSetup } from '../textarea-setup/textarea-setup';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { FORM_ITEM } from '../../form-item.token';
import { FormItem } from '../../../../../../public/utils/types';
import { ButtonSetup } from '../button-setup/button-setup';
import { MultiChoiceSetup } from '../multi-choice-setup/multi-choice-setup';
import { RadioButtonSetup } from '../radio-button-setup/radio-button-setup';
import { ToggleSetup } from '../toggle-setup/toggle-setup';
import { HelperTextSetup } from '../helper-text-setup/helper-text-setup';
import { ConditionsAcceptanceSetup } from '../conditions-acceptance-setup/conditions-acceptance-setup';
import { DateTimeSetup } from '../date-time-setup/date-time-setup';
import { FileSetup } from '../file-setup/file-setup';

@Component({
  selector: 'app-field-setup',
  imports: [CommonModule,],
  templateUrl: './field-setup.html',
  styleUrl: './field-setup.scss'
})
export class FieldSetup {
  @Input() item!: FormItem;
  @Input() formGroup!: FormGroup;
  @Output() itemUpdated = new EventEmitter<FormItem>();

  component!: Type<any>;
  injector!: Injector;

  @ViewChild('dynamicContainer', { read: ViewContainerRef })
  dynamicContainer!: ViewContainerRef;

  constructor(private parentInjector: Injector) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item'] && this.item) {
      const map: Record<string, Type<any>> = {
        text: TextSetup,
        dropdown: DropdownSetup,
        textarea: TextareaSetup,
        button: ButtonSetup,
        'multiple-choice': MultiChoiceSetup,
        radio: RadioButtonSetup,
        toggle: ToggleSetup,
        helper: HelperTextSetup,
        "text-condition": ConditionsAcceptanceSetup,
        datetime: DateTimeSetup,
        file: FileSetup,
      };

      this.component = map[this.item.type];
      this.createInjector();

      // load the setup component dynamically and listen to output
      setTimeout(() => this.loadDynamicComponent());
    }
  }

  private createInjector() {
    this.injector = Injector.create({
      providers: [
        { provide: FormGroup, useValue: this.formGroup },
        { provide: FORM_ITEM, useValue: this.item },
      ],
      parent: this.parentInjector,
    });
  }

  private loadDynamicComponent() {
    if (!this.dynamicContainer || !this.component) return;

    this.dynamicContainer.clear();
    const compRef: ComponentRef<any> = this.dynamicContainer.createComponent(this.component, {
      injector: this.injector,
    });

    // ✅ Subscribe to itemUpdated from child
    if (compRef.instance.itemUpdated) {
      compRef.instance.itemUpdated.subscribe((updatedItem: FormItem) => {
        this.onItemUpdated(updatedItem);
      });
    }
  }

  // this method now receives updates from TextSetup
  onItemUpdated(updatedItem: FormItem) {
    this.item = { ...updatedItem };
    this.itemUpdated.emit(this.item);
  }
}
