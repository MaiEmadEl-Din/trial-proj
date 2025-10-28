import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

interface PaletteItem {
  type: string;
  label: string;
  icon?: string;
}

interface FormItem extends PaletteItem {
  id: string;
  props?: Record<string, any>;
}
@Component({
  selector: 'app-root',
  imports: [DragDropModule, CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  paletteItems: PaletteItem[] = [
    { type: 'text', label: 'Text Field', icon: '📝' },
    { type: 'button', label: 'Button', icon: '🔘' },
    { type: 'textarea', label: 'Text Area', icon: '✒️' },
    { type: 'dropdown', label: 'Drop Down', icon: '▾' },
    // add more palette items here
  ];

  // items placed on the canvas
  canvasItems: FormItem[] = [];

  // called when something is dropped into the canvas list
  drop(event: CdkDragDrop<FormItem[]>) {
    // If dropped inside the same container => reorder
    if (event.previousContainer === event.container) {
      moveItemInArray(this.canvasItems, event.previousIndex, event.currentIndex);
      return;
    }

    // Dropped from palette => create a new FormItem (copy)
    const paletteData = event.item.data as PaletteItem;
    const newItem: FormItem = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      type: paletteData.type,
      label: paletteData.label,
      props: {},
    };

    // Insert at the dropped index
    this.canvasItems.splice(event.currentIndex, 0, newItem);
  }

  // Remove item from canvas
  removeItem(index: number) {
    this.canvasItems.splice(index, 1);
  }

  // Simple helper: when canvas is empty and user clicks the card to add first item
  addFirst(paletteType?: string) {
    const p = paletteType ? this.paletteItems.find((x) => x.type === paletteType) : this.paletteItems[0];
    if (!p) return;
    this.canvasItems.push({
      id: Date.now().toString(36),
      type: p.type,
      label: p.label,
      props: {},
    });
  }
}
