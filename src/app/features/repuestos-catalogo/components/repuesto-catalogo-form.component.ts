import { Component, EventEmitter, input, Output } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TipoRepuestoDropdownResponseDto } from '../../tipos-repuesto/models/tipo-repuesto.model';
import { RepuestoCatalogoCreateRequestDto } from '../models/repuesto-catalogo.model';

@Component({
  selector: 'app-repuesto-catalogo-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './repuesto-catalogo-form.component.html',
  styleUrl: './repuesto-catalogo-form.component.scss'
})
export class RepuestoCatalogoFormComponent {
  readonly form = input.required<FormGroup>();
  readonly tiposRepuesto = input<TipoRepuestoDropdownResponseDto[]>([]);
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

  protected control(name: keyof RepuestoCatalogoCreateRequestDto): AbstractControl | null {
    return this.form().get(name);
  }

  protected hasError(name: keyof RepuestoCatalogoCreateRequestDto): boolean {
    const ctrl = this.control(name);
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  protected errorMessage(name: keyof RepuestoCatalogoCreateRequestDto): string {
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
      return 'Supera la longitud máxima permitida.';
    }

    return 'Valor inválido.';
  }
}
