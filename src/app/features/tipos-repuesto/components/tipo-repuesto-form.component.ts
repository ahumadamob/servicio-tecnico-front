import { Component, EventEmitter, input, Output } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TipoRepuestoCreateRequestDto } from '../models/tipo-repuesto.model';

@Component({
  selector: 'app-tipo-repuesto-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tipo-repuesto-form.component.html',
  styleUrl: './tipo-repuesto-form.component.scss'
})
export class TipoRepuestoFormComponent {
  readonly form = input.required<FormGroup>();
  readonly submitLabel = input.required<string>();
  readonly submitting = input<boolean>(false);
  readonly globalErrors = input<string[]>([]);

  @Output() readonly submitted = new EventEmitter<void>();
  @Output() readonly cancelled = new EventEmitter<void>();

  protected onSubmit(): void {
    this.form().markAllAsTouched();
    if (this.form().invalid) {
      return;
    }

    this.submitted.emit();
  }

  protected control(name: keyof TipoRepuestoCreateRequestDto): AbstractControl | null {
    return this.form().get(name);
  }

  protected hasError(name: keyof TipoRepuestoCreateRequestDto): boolean {
    const ctrl = this.control(name);
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  protected errorMessage(name: keyof TipoRepuestoCreateRequestDto): string {
    const ctrl = this.control(name);
    const errors = ctrl?.errors;
    if (!errors) {
      return '';
    }

    if (typeof errors['backend'] === 'string') {
      return errors['backend'] as string;
    }

    if (errors['required']) {
      return 'Este campo es obligatorio.';
    }

    if (errors['maxlength']) {
      return 'No puede superar los 100 caracteres.';
    }

    return 'Valor inválido.';
  }
}
