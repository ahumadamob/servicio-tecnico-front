import { Component, computed, EventEmitter, input, Output } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClienteUpsertRequestDto } from '../models/cliente.model';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.scss'
})
export class ClienteFormComponent {
  readonly form = input.required<FormGroup>();
  readonly submitLabel = input.required<string>();
  readonly submitting = input<boolean>(false);
  readonly globalErrors = input<string[]>([]);

  @Output() readonly submitted = new EventEmitter<void>();
  @Output() readonly cancelled = new EventEmitter<void>();

  protected readonly isEmpresa = computed(() => this.form().get('tipoCliente')?.value === 'EMPRESA');

  protected onSubmit(): void {
    this.form().markAllAsTouched();
    if (this.form().invalid) {
      return;
    }

    this.submitted.emit();
  }

  protected control(name: keyof ClienteUpsertRequestDto): AbstractControl | null {
    return this.form().get(name);
  }

  protected hasError(name: keyof ClienteUpsertRequestDto): boolean {
    const ctrl = this.control(name);
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  protected errorMessage(name: keyof ClienteUpsertRequestDto): string {
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
