import { Component, EventEmitter, Inject, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Editor, NGX_EDITOR_CONFIG_TOKEN, NgxEditorComponent, NgxEditorFloatingMenuComponent, NgxEditorMenuComponent, NgxEditorModule, NgxEditorService, Toolbar } from 'ngx-editor';
import { FormItem } from '../../../../../../public/utils/types';
import { FORM_ITEM } from '../../form-item.token';

@Component({
  selector: 'app-conditions-acceptance-setup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxEditorModule, NgxEditorComponent, NgxEditorMenuComponent
  ],
  templateUrl: './conditions-acceptance-setup.html',
  styleUrl: './conditions-acceptance-setup.scss'
})
export class ConditionsAcceptanceSetup {
  @Output() itemUpdated = new EventEmitter<FormItem>();
  form: FormGroup;
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic', 'underline', 'bullet_list', 'ordered_list', 'link'],
  ];

  constructor(private fb: FormBuilder, @Inject(FORM_ITEM) public item: FormItem) {
    this.form = this.fb.group({
      content: new FormControl(item.props?.content || ''),
      options: this.fb.array(
        (item.props?.options || [{ label: 'I agree to the terms' }]).map(
          (opt: any) =>
            this.fb.group({
              label: new FormControl(opt.label),
            })
        )
      ),
      required: new FormControl(item.props?.required || false),
    });

    // Watch for changes
    this.form.valueChanges.subscribe(val => {
      item.props = {
        ...item.props,
        ...val,
      };
      this.itemUpdated.emit(item);
    });
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  get options(): FormArray {
    return this.form.get('options') as FormArray;
  }

  addOption(): void {
    this.options.push(
      this.fb.group({
        label: new FormControl(`Option ${this.options.length + 1}`),
      })
    );
  }

  removeOption(index: number): void {
    this.options.removeAt(index);
  }
}
