import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { lookupService } from '../../lookup.service';
import { map } from 'rxjs';
import { isEqual } from 'lodash-es';

@Component({
  selector: 'app-basicdata-form',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './basicdata-form.html',
  styleUrl: './basicdata-form.scss'
})
export class BasicdataForm {
  lookupForm: FormGroup;
  router = inject(Router);
  route = inject(ActivatedRoute);
  isEditMode: boolean = false;
  isFormEditable: boolean = false;
  lookupID: string | null = null;
  lookupService = inject(lookupService);
  originalFormData: any = null;

  dataEffect = effect(() => {
    const data = this.lookupService.getByIdResult();
    if (data) {
      console.log('heree');
      this.lookupForm.patchValue(data);
      console.log(this.lookupForm.value);
      
      this.originalFormData = this.lookupForm.getRawValue();
    }
  });

  constructor(private fb: FormBuilder) {
    this.lookupForm = this.fb.group({
      lookup_name_en: ['', Validators.required],
      lookup_name_ar: ['', Validators.required],
      status: [true],
      fields: this.fb.array([this.createField()]),
    });
    if (this.isEditMode) {
      this.lookupForm.disable();
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.lookupID = params.get('id');
      if (this.lookupID) {
        this.isEditMode = true;
        this.lookupService.getById(this.lookupID);
      }
    });
  }

  get fields(): FormArray {
    return this.lookupForm.get('fields') as FormArray;
  }

  createField(): FormGroup {
    return this.fb.group({
      field_name_en: ['', Validators.required],
      field_name_ar: ['', Validators.required],
      required: [false],
    });
  }

  addField() {
    this.fields.push(this.createField());
  }

  removeField(index: number) {
    this.fields.removeAt(index);
  }

  toggleEdit() {
    this.isFormEditable = !this.isFormEditable;
    this.isFormEditable ? this.lookupForm.enable() : this.lookupForm.disable();
  }

  save() {
    if (this.lookupForm.invalid) {
      this.lookupForm.markAllAsTouched();
      return;
    }
    let payload = {
      ...this.lookupForm.value,
      status: this.lookupForm.value.status ? 'Active' : 'Inactive'
    };

    console.log('Form Data:', payload);
  }

  back() {
    this.router.navigate(['/basic-data']);
  }

  isEqual() {
    const currentValue = this.lookupForm.getRawValue();
    if (!this.originalFormData) {
      return false;
    }
    return isEqual(currentValue, this.originalFormData);
  }
}
