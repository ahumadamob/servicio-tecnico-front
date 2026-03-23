import { Component, EventEmitter, input, Output } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TecnicoUpsertRequestDto } from '../models/tecnico.model';

@Component({
  selector: 'app-tecnico-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tecnico-form.component.html',
  styleUrl: './tecnico-form.component.scss'
})
export class TecnicoFormComponent {
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

  protected control(name: keyof TecnicoUpsertRequestDto): AbstractControl | null {
    return this.form().get(name);
  }

  protected hasError(name: keyof TecnicoUpsertRequestDto): boolean {
    const ctrl = this.control(name);
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  protected errorMessage(name: keyof TecnicoUpsertRequestDto): string {
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

    if (errors['email']) {
      return 'Ingresá un email válido.';
    }

    return 'Valor inválido.';
  }
}
