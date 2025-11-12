import { DOCUMENT, HostListener, inject, Injectable, signal } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { VersionHistoryService } from './version-history.service';
import {FormItem} from '../../../../public/utils/types'
@Injectable({ providedIn: 'root' })
export class CanvasStateService {

    formData = signal<any>(null);



    // Canvas items (what user builds)
    canvasItems = signal<FormItem[]>([]);

    // Editing state
    editingItem = signal<FormItem | null>(null);
    editingIndex = signal<number | null>(null);
    tempItem = signal<FormItem | null>(null);

    // redo - undo
    undoStack = signal<FormItem[][]>([]);
    redoStack = signal<FormItem[][]>([]);

    // Grid settings
    readonly gridColumnWidth = 120;
    readonly gridTotalWidth = this.gridColumnWidth + 40;


    // Accordion states
    accordionOpen = signal(true);


    toggleAccordion() {
        this.accordionOpen.update(v => !v);
    }

    // Form styles
    formStyles = signal({
        backgroundColor: '#ffffff',
        fontFamily: 'cairo',
        alignment: 'justify-center',
        gridColumns: 'grid-cols-1'
    });

    // Canvas layout settings
    canvasItemSpacing = signal(4);
    zoomLevel = signal(1);
    gridVisible = signal(false);

    // ─────────────────────────
    // Add new item from palette
    // ─────────────────────────
    addItem(source: FormItem) {
        this.saveStateSnapshot();
        const newItem = structuredClone(source);
        this.canvasItems.update(list => [...list, newItem]);
        const index = this.canvasItems().length - 1;
        this.selectItem(newItem, index);
    }

    // ─────────────────────────
    // Drag / Drop
    // ─────────────────────────
    drop(event: CdkDragDrop<FormItem[]>) {
        console.log('drop');

        this.saveStateSnapshot();
        const current = this.canvasItems();

        // reorder inside canvas
        if (event.previousContainer === event.container) {
            const reordered = [...current];
            moveItemInArray(reordered, event.previousIndex, event.currentIndex);
            this.canvasItems.set(reordered);
            return;
        }

        // dragged from palette to canvas
        const newItem = structuredClone(event.previousContainer.data[event.previousIndex]);
        this.canvasItems.update(list => [...list, newItem]);
        const index = this.canvasItems().length - 1;
        this.selectItem(newItem, index);
    }

    // ─────────────────────────
    // click on in the canvas item to edit
    // ─────────────────────────
    selectItem(item: FormItem, index: number) {
        this.saveStateSnapshot();
        this.tempItem.set(structuredClone(item));
        this.editingItem.set(item);
        this.editingIndex.set(index);
    }

    saveEdit() {
        this.clearEditor();
    }

    cancelEdit() {
        const backup = this.tempItem();
        if (!backup?.id) {
            this.clearEditor();
            return;
        }

        this.canvasItems.update(list => {
            const idx = list.findIndex(x => x.id === backup.id);
            if (idx !== -1) {
                list[idx] = structuredClone(backup);
            }
            return [...list];
        });

        this.clearEditor();
    }


    clearEditor() {
        this.editingItem.set(null);
        this.tempItem.set(null);
        this.editingIndex.set(null);
    }

    deleteItem(index: number) {
        this.canvasItems.update(list => list.filter((_, i) => i !== index));
        this.clearEditor();
    }

    // ────────────────────────────────────────────────── bottom bar actions ──────────────────────────────────────────────────────────────
    zoomIn() { this.zoomLevel.update(z => Math.min(z + .1, 3)); }
    zoomOut() { this.zoomLevel.update(z => Math.max(z - .1, .5)); }
    toggleGrid() { this.gridVisible.update(v => !v); }
    increaseSpacing() { this.canvasItemSpacing.update(s => s + 4); }

    getCanvasGridStyles(): { [k: string]: any } {
        const base = { 'background-color': this.formStyles().backgroundColor };
        if (!this.gridVisible()) { return base; }
        const colCount = Number(this.formStyles().gridColumns.split('-').pop()) || 1;
        const gridWidth = this.gridTotalWidth * colCount;
        return {
            ...base,
            'background-image': `repeating-linear-gradient(
                to right,
                rgba(202, 225, 244, 0.4),
                rgba(202, 225, 244, 0.4) ${this.gridColumnWidth}px,
                transparent ${this.gridColumnWidth}px,
                transparent ${this.gridTotalWidth}px
            )`,
            'background-size': `${gridWidth}px 100%`,
            'background-repeat': 'no-repeat'
        };
    }

    addHeading(level: 'h1' | 'h2' | 'h4') {
        this.saveStateSnapshot();
        const headingItem: FormItem = {
            id: crypto.randomUUID(),
            type: 'heading',
            icon: '',
            label: 'Heading',
            props: {
                text: level === 'h1' ? 'Form Title' : level === 'h2' ? 'Section Title' : 'Subsection'
            },
            styles: {
                fontSize: level === 'h1' ? '1.8rem' :
                    level === 'h2' ? '1.4rem' : '1.1rem',
                fontWeight: '600',
                margin: '6px 0'
            }
        };

        this.canvasItems.update(list => [...list, structuredClone(headingItem)]);
    }

    addDivider() {
        this.saveStateSnapshot();
        const dividerItem: FormItem = {
            id: crypto.randomUUID(),
            type: 'divider',
            label: '',
            icon: '',
            styles: {},
            props: {}
        };
        this.canvasItems.update(list => [...list, structuredClone(dividerItem)]);
    }

    // Form Styles Panel Toggle
    formStylesAccordionOpen = signal(false);
    toggleFormStylesAccordion() {
        this.formStylesAccordionOpen.update(v => !v);
    }

    // ────────────────────────────────────────────────── Tabs Management ─────────────────────────────────────────────────────────────
    // Left Sidebar Tabs
    activeFormTab = signal<'basic' | 'templates'>('basic');
    setActiveFormTab(tab: 'basic' | 'templates') {
        this.activeFormTab.set(tab);
    }

    // field Properties Panel Tabs
    activeFieldTab = signal<'setup' | 'styles'>('setup');
    setActiveFieldTab(tab: 'setup' | 'styles') {
        this.activeFieldTab.set(tab);
    }

    // ────────────────────────────────────────────────── Update item live ──────────────────────────────────────────────────────────────
    // ---  Update item live ---
    onItemUpdated(updatedItem: FormItem) {
        if (this.editingItem) {
            Object.assign(this.editingItem, updatedItem);
        }
    }

    // --- Update styles live ---
    onStyleChange(updatedStyles: Record<string, any>) {
        const item = this.editingItem();
        if (!item) return;

        if (!item.styles) item.styles = {};

        Object.assign(item.styles, updatedStyles['styles']);
    }

    // ────────────────────────────────────────────────── undo / redo ──────────────────────────────────────────────────────────────
    saveStateSnapshot() {
        this.undoStack.update(stack => [
            ...stack,
            structuredClone(this.canvasItems())  // DEEP CLONE ✔
        ]);

        // When taking a new action, redo history should clear
        this.redoStack.set([]);
    }

    undo() {
        const history = this.undoStack();
        if (history.length === 0) return;

        const lastState = history[history.length - 1];

        // Push current state to redo stack
        this.redoStack.update(stack => [...stack, structuredClone(this.canvasItems())]);

        // Restore previous state
        this.canvasItems.set(structuredClone(lastState));

        // Remove snapshot from undo stack
        this.undoStack.update(stack => stack.slice(0, -1));

        // ✅ Important fix: stop restoring old temp edit backup
        this.clearEditor();
    }

    redo() {
        const redoHistory = this.redoStack();
        if (redoHistory.length === 0) return;

        const restoredState = redoHistory[redoHistory.length - 1];

        // Push current state to undo stack
        this.undoStack.update(stack => [...stack, structuredClone(this.canvasItems())]);

        // Restore redo snapshot
        this.canvasItems.set(structuredClone(restoredState));

        // Remove from redo stack
        this.redoStack.update(stack => stack.slice(0, -1));

        // ✅ Also clear editor here
        this.clearEditor();
    }

    // ────────────────────────────────────────────────── save form ──────────────────────────────────────────────────────────────
    versionService = inject(VersionHistoryService);
    saveForm() {
        const payload = {
            fields: this.canvasItems().map((item, index) => ({
                type: item.type,
                label: item.label,
                props: item.props,
                styles: item.styles,
                order: index,
            })),
            styles: this.formStyles()
        };

        console.log('payload', payload);
        this.versionService.versionHistory.update((history: any) => [
            {
                fields: payload.fields,
                styles: payload.styles,
                version: `Version ${history.length + 1}`,
                date: 'Just now'
            },
            ...history
        ]);
    }
    // ───────────────────────────────────────────────────────── top right menu ─────────────────────────────────────────────────────────────────
    topRightMenuOpen = signal(false);
    toggleTopRightMenu(event: MouseEvent) {
        event.stopPropagation();
        this.topRightMenuOpen.set(!this.topRightMenuOpen());
    }

    // ───────────────────────────────────────────────────────── Duplicate ─────────────────────────────────────────────────────────────────
    duplicateForm() {
        const currentForm = this.formData();
        if (!currentForm) return;
        const duplicatedFormData = structuredClone(currentForm);
        duplicatedFormData.formName = `${duplicatedFormData.formName}-copy`;
        duplicatedFormData.id = null;

        this.formData.set(duplicatedFormData);
        const duplicatedItems = structuredClone(this.canvasItems());
        const duplicatedStyles = structuredClone(this.formStyles());

        this.canvasItems.set(duplicatedItems);
        this.formStyles.set(duplicatedStyles);
        this.clearEditor();
        this.undoStack.set([]);
        this.redoStack.set([]);


        //Save the current form to backend(update).

        //Save the duplicate to backend(create new form with new ID and name).
    }
}
