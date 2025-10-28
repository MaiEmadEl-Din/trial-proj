import { CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldSetup } from '../setup/field-setup/field-setup';
import { FieldStyles } from '../styles/field-styles/field-styles';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

export interface FormItem {
  type: string;
  label?: string;
  icon: string;
  isHovering?: boolean;
  props?: {
    placeholder?: string;
    required?: boolean;
    options?: any[];
    buttonText?: string;
    classes?: string;
    width?: 'full' | 'half' | 'auto';
    multiselect?: boolean;
    [key: string]: any;
  };
  styles?: {
    backgroundColor?: string;
    font?: string;
    fontSize?: number;
    fontWeight?: string;
    textColor?: string;
    textDirection?: 'ltr' | 'rtl';
    border?: string;
    enabled?: boolean;
    fontFamily?: string;
    color?: string;
    direction?: 'ltr' | 'rtl';
    hover?: {
      backgroundColor?: string;
      color?: string;
      fontSize?: number;
      fontWeight?: string;
      fontFamily?: string;
      border?: string;
      borderWidth?: number;
      borderRadius?: string;
      borderColor?: string;
      direction?: 'ltr' | 'rtl';
      [key: string]: any;
    },
    borderWidth?: number;
    borderRadius?: string;
    borderColor?: string;
    [key: string]: any;
  };
}

@Component({
  selector: 'app-canvas-component',
  imports: [
    CommonModule, DragDropModule, FormsModule, ReactiveFormsModule, FieldSetup, FieldStyles,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './canvas-component.html',
  styleUrl: './canvas-component.scss'
})
export class CanvasComponent {
  formData: any;
  router = inject(Router);
  activeFormTab: 'basic' | 'templates' = 'basic';
  @ViewChild('paletteList') paletteList!: CdkDropList;

  accordionOpen = true; // Default open or closed

  toggleAccordion() {
    this.accordionOpen = !this.accordionOpen;
  }


  constructor() {
    this.formData = this.router.getCurrentNavigation()?.extras.state?.['formData'];
  }
  paletteItems: FormItem[] = [
    { type: 'text', label: 'Text Field', icon: 'esc-icons:text-input', props: { placeholder: 'Enter text' } },
    { type: 'textarea', label: 'Text Area', icon: 'esc-icons:text-area', props: { placeholder: 'Enter description' } },
    { type: 'button', label: 'Submit Button', icon: 'esc-icons:button', props: { buttonText: 'Submit' } },
    { type: 'dropdown', label: 'Dropdown', icon: 'esc-icons:arrow-down' },
    { type: 'multiple-choice', label: 'Multiple Choice', icon: 'esc-icons:square-check' },
    { type: 'radio', label: 'Radio Button', icon: 'esc-icons:circle-check' },
    { type: 'toggle', label: 'Toggle Switch', icon: 'esc-icons:toggle' },
    { type: 'datetime', label: 'Date & Time', icon: 'esc-icons:calendar-clock' },
    { type: 'file', label: 'File Upload', icon: 'esc-icons:upload' },
    { type: 'helper', label: 'Helper Text', icon: 'esc-icons:quote' },
    { type: 'text-condition', label: 'Terms & Acceptance', icon: 'esc-icons:text-change' },
  ];

  canvasItems: FormItem[] = [];
  editingItem: FormItem | null = null;
  editingIndex: number | null = null;
  tempItem: FormItem | null = null;
  activeTab: 'setup' | 'styles' = 'setup';

  drop(event: CdkDragDrop<FormItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.canvasItems, event.previousIndex, event.currentIndex);
    } else {

      const newItem = structuredClone(event.previousContainer.data[event.previousIndex]);
      console.log('newwww', newItem);

      this.canvasItems.push(newItem);

      const index = this.canvasItems.length - 1;
      this.selectItem(this.canvasItems[index], index, new MouseEvent('click'));
    }
  }

  // --- 🔹 Add from Palette ---
  addFromPalette(item: FormItem) {
    const newItem = structuredClone(item);
    this.canvasItems.push(newItem);

    const index = this.canvasItems.length - 1;
    this.selectItem(this.canvasItems[index], index, new MouseEvent('click'));
  }

  // --- 🔹 Select Item (start editing) ---
  selectItem(item: FormItem, index: number, event: MouseEvent) {
    event.stopPropagation();
    this.editingIndex = index;

    // store original copy for cancel
    // A backup copy of the item’s state before editing — used if you press “Cancel” to revert.
    this.tempItem = structuredClone(item);

    // link editingItem directly → live preview works
    this.editingItem = this.canvasItems[index];
  }

  deleteItem(index: number, event: MouseEvent) {
    event.stopPropagation();

    // If the deleted item is currently being edited — close the editor
    if (this.editingIndex === index) {
      this.clearEditor();
    }

    // Adjust editingIndex if necessary (e.g., deleting before the current edited one)
    if (this.editingIndex !== null && index < this.editingIndex) {
      this.editingIndex--;
    }

    this.canvasItems.splice(index, 1);
  }


  // ---  Update item live (setup or props) ---
  onItemUpdated(updatedItem: FormItem) {
    if (this.editingItem) {
      // directly mutate the live item (instant preview)
      console.log('editt', updatedItem);
      
      Object.assign(this.editingItem, updatedItem);
    }
  }

  setActiveTab(tab: 'basic' | 'templates') {
    this.activeFormTab = tab;
  }

  // --- Update styles live ---
  onStyleChange(updatedStyles: Record<string, any>) {
    if (!this.editingItem) return;

    if (!this.editingItem.styles) this.editingItem.styles = {};
    console.log('hiioo', updatedStyles);

    Object.assign(this.editingItem.styles, updatedStyles['styles']);
  }

  // ---  Save the whole form ---
  saveForm() {
    const payload = {
      formName: 'My Custom Form',
      fields: this.canvasItems.map((item, index) => ({
        type: item.type,
        label: item.label,
        props: item.props,
        styles: item.styles,
        order: index,
      })),
    };

    console.log('payload', payload);
  }

  // --- Save Edit (keep live changes) ---
  saveEdit() {
    // live changes are already applied
    this.clearEditor();
  }

  // --- Cancel Edit (revert changes) ---
  cancelEdit() {
    if (this.editingIndex !== null && this.tempItem) {
      // restore snapshot
      this.canvasItems[this.editingIndex] = structuredClone(this.tempItem);
    }
    this.clearEditor();
  }

  // ---  Reset editing state ---
  private clearEditor() {
    this.editingItem = null;
    this.tempItem = null;
    this.editingIndex = null;
  }



  // Apply hover style when mouse enters
  applyHover(item: FormItem) {
    if (!item.styles?.hover) return;
    item.styles['isHovering'] = true;
  }

  // Remove hover style when mouse leaves
  removeHover(item: FormItem) {
    if (item.styles) {
      item.styles['isHovering'] = false;
    }
  }

  // Merge base styles with hover styles if currently hovering
  mergeBaseAndHoverStyles(item: FormItem): Record<string, any> {
    if (!item.styles) return {};

    const base = { ...item.styles };
    const hover = item.styles.hover || {};

    // Don’t pass control flags or hover itself as CSS
    delete base.hover;
    delete base['isHovering'];

    // When hovering, merge the hover styles
    return item.styles['isHovering'] ? { ...base, ...hover } : base;
  }
}
