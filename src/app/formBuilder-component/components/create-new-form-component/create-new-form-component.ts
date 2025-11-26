import { DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-form-component',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-new-form-component.html',
  styleUrl: './create-new-form-component.scss'
})
export class CreateNewFormComponent {
  form!: FormGroup;
  dialogRef = inject(DialogRef<CreateNewFormComponent>);

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      formName: ['', [Validators.required]],
      formType: ['one', Validators.required],
      showStepperGuide: [true],
      stepperStyle: ['horizontal'],
    });
  }

  setFormType(type: 'one' | 'multi') {
    this.form.patchValue({ formType: type });

    // Reset stepper options if switching back to One Page
    if (type === 'one') {
      this.form.patchValue({
        showStepperGuide: false,
        stepperStyle: 'horizontal',
      });
    }
  }

  setStepperStyle(style: 'vertical' | 'horizontal') {
    this.form.patchValue({ stepperStyle: style });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onCreate() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value;
    this.dialogRef.close();
    
    this.router.navigate(['/form-builder/add'], {
      state: { formData },
    });
  }
}
