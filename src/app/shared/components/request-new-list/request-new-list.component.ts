import { Component } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

const VALIDATION_MESSAGES = {
  title: { 
    required: 'El nombre es requerido',
    maxLength: 'máximo 21 letras',
    minLength: 'mínimo una letra'
  },
};

@Component({
  selector: 'app-request-new-list',
  templateUrl: './request-new-list.component.html',
  styleUrls: ['./request-new-list.component.sass'],
})
export class RequestNewListComponent {
 
  readonly validationMessages = VALIDATION_MESSAGES
 
  form: FormGroup;


  constructor(
    private dialogRef: MatDialogRef<RequestNewListComponent>,
    private _formBuilder: FormBuilder
  ) {
    dialogRef.disableClose = true;
    this.form = this._formBuilder.group({
      title: ['', [
        Validators.required, 
        Validators.minLength(1),
        Validators.maxLength(27)
      ]],
      background: [''],
    });
  }

  onBackgroundChange(event: string) {
    this.form.patchValue({ background: event });
  }

  isValid() {
    return this.form.valid;
  }

  confirmRequestNewList() {
    this.dialogRef.close({
      title: this.form.value.title,
      background: this.form.value.background || '',
    });
  }
}
