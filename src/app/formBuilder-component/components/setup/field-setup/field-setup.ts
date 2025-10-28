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
import { FormItem } from '../../canvas-component/canvas-component';

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

  constructor(private parentInjector: Injector) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item'] && this.item) {
      const map: Record<string, Type<any>> = {
        text: TextSetup,
        dropdown: DropdownSetup,
        textarea: TextareaSetup,
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
