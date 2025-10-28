import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldSetup } from './components/setup/field-setup/field-setup';
import { FieldStyles } from './components/styles/field-styles/field-styles';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { BreadCrumbComponent } from '../shared/bread-crumb/bread-crumb.component';
import { FormsList } from "./components/forms-list/forms-list";
import { MatDialog } from '@angular/material/dialog';
import { CreateNewFormComponent } from './components/create-new-form-component/create-new-form-component';


@Component({
  selector: 'app-basicdata-component',
  imports: [
    CommonModule, DragDropModule, FormsModule, ReactiveFormsModule, MatIconModule,
    FormsList
],
  templateUrl: './formBuilder-component.html',
  styleUrl: './formBuilder-component.scss'
})
export class FormBuilderComponent {
  router = inject(Router)
  dialog = inject(MatDialog);
  onCreateForm() {
    this.dialog.open(CreateNewFormComponent, {
      width: '500px',
      disableClose: false
    });
  }

}
