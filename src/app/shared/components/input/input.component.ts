import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, inject, Injector, input, Input, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

const DEFAULT_VALIDATION = { required: 'Campo requerido' };


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent
  implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor
{
  id = input<string>('');
  label = input<string>('');
  type = input<string>('text');
  placeholder = input<string>('');
  errors = input<any>({});
  validateOnInit = input<boolean>(false);
  allowToggle = input<boolean>(false);
  required = input<boolean>(false);

  @Output() valueChange = new EventEmitter<string>();

  // Internal state signals
  readonly value = signal<any>('');
  readonly disabled = signal<boolean>(false);
  readonly touched = signal<boolean>(false);
  readonly focused = signal<boolean>(false);
  readonly passwordVisible = signal<boolean>(false);
  readonly hasValueState = signal<boolean>(false);

  // Dependencies
  private readonly injector = inject(Injector);
  private readonly cdr = inject(ChangeDetectorRef);

  // Internal state
  private ngControl: NgControl | null = null;
  private valueChangesSub: Subscription | null = null;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  // Computed properties for template
  get elementClasses() {
    return {
      'not-empty': this.hasValueState(),
      'has-error': this.hasError(),
      'is-focused': this.focused(),
      disabled: this.isDisabled(),
    };
  }

  get inputType() {
    return this.type() === 'password' && this.passwordVisible()
      ? 'text'
      : this.type();
  }

  get errorMessage(): string {
    if (!this.shouldShowValidation()) return '';

    const errorsObj = this.errors();

    if (this.isRequired() && !this.hasValue()) {
      return errorsObj['required'] || DEFAULT_VALIDATION.required;
    }

    const controlErrors = this.getControl()?.errors;
    if (controlErrors) {
      const errorKey = Object.keys(controlErrors)[0];
      if (errorKey && errorsObj[errorKey]) {
        return errorsObj[errorKey];
      }
    }

    return '';
  }

  // Lifecycle hooks
  ngOnInit() {
    this.setupNgControl();
    this.checkAndUpdateValue();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const control = this.getControl();

      if (control) {
        this.updateValueFromControl(control.value);
        this.disabled.set(!!control.disabled);

        this.setupValueChangesSubscription(control);
      }

      this.checkAndUpdateValue();
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.valueChangesSub?.unsubscribe();
  }

  // Event handlers
  onFocus(): void {
    this.focused.set(true);
  }

  onBlur(): void {
    this.focused.set(false);
    this.markAsTouched();
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.setValue(value);
  }

  togglePasswordVisibility(): void {
    if (this.type() === 'password' && this.allowToggle()) {
      this.passwordVisible.update((visible) => !visible);
    }
  }

  // Control value accessor implementation
  writeValue(value: any): void {
    this.value.set(value);
    this.updateHasValueState();
    this.cdr.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  // Form control methods
  getValue(): any {
    return this.getControl()?.value ?? this.value();
  }

  setValue(value: any): void {
    if (this.getControl()) {
      this.getControl()!.setValue(value);
    } else {
      this.value.set(value);
      this.onChange(value);
    }

    this.updateHasValueState();
    this.valueChange.emit(value);
  }

  markAsTouched(): void {
    if (this.getControl()) {
      this.getControl()!.markAsTouched();
      this.getControl()!.updateValueAndValidity();
    } else {
      this.touched.set(true);
      this.onTouched();
    }
  }

  // State checks
  isRequired(): boolean {
    if (this.required()) return true;

    const ctrl = this.getControl();
    if (!ctrl?.validator) return false;

    try {
      const validator = ctrl.validator({} as FormControl);
      return !!validator && validator.hasOwnProperty('required');
    } catch {
      return false;
    }
  }

  isDisabled(): boolean {
    return this.getControl()?.disabled || this.disabled();
  }

  hasError(): boolean {
    if (this.getControl()) {
      return this.getControl()!.invalid && this.shouldShowValidation();
    }
    return this.touched() && !this.hasValue() && this.isRequired();
  }

  hasValue(): boolean {
    const value = this.getValue();
    return value !== null && value !== undefined && value !== '';
  }

  shouldShowValidation(): boolean {
    if (this.getControl()) {
      return this.getControl()!.touched || this.getControl()!.dirty;
    }
    return this.touched();
  }

  // Helper methods
  getControl(): FormControl | null {
    if (this.ngControl?.control) {
      return this.ngControl.control as FormControl;
    }
    return null;
  }

  private setupNgControl(): void {
    try {
      this.ngControl = this.injector.get(NgControl, null);
      if (this.ngControl) {
        this.ngControl.valueAccessor = this;
      }
    } catch (err) {}
  }

  private setupValueChangesSubscription(control: FormControl): void {
    this.valueChangesSub?.unsubscribe();
    this.valueChangesSub = control.valueChanges.subscribe((value) => {
      this.updateValueFromControl(value);
    });
  }

  private updateValueFromControl(value: any): void {
    this.value.set(value);
    this.updateHasValueState();
    this.cdr.detectChanges();
  }

  private checkAndUpdateValue(): void {
    const currentValue = this.getControl()?.value;
    if (currentValue !== undefined && currentValue !== null) {
      this.updateValueFromControl(currentValue);
    }
  }

  private updateHasValueState(): void {
    const value = this.getValue();
    const hasValue = value !== null && value !== undefined && value !== '';
    this.hasValueState.set(hasValue);
  }
}
