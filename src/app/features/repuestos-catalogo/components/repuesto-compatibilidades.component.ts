import { NgClass } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { MarcaDropdownResponseDto, ModeloEquipoDropdownResponseDto } from '../../../shared/models/dropdown.model';
import { CatalogosDropdownService } from '../../../shared/services/catalogos-dropdown.service';
import { mapBackendErrorsToForm } from '../../../shared/utils/form-error.mapper';
import { RepuestoModeloCompatibilidadCreateRequestDto, RepuestoModeloCompatibilidadResponseDto } from '../models/repuesto-catalogo.model';
import { RepuestosCatalogoApiService } from '../services/repuestos-catalogo-api.service';

@Component({
  selector: 'app-repuesto-compatibilidades',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, EmptyStateComponent, ConfirmModalComponent],
  templateUrl: './repuesto-compatibilidades.component.html',
  styleUrl: './repuesto-compatibilidades.component.scss'
})
export class RepuestoCompatibilidadesComponent implements OnInit {
  private readonly repuestosApi = inject(RepuestosCatalogoApiService);
  private readonly catalogosDropdown = inject(CatalogosDropdownService);
  private readonly fb = inject(FormBuilder);

  readonly repuestoId = input.required<number>();

  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly globalErrors = signal<string[]>([]);

  protected readonly marcas = signal<MarcaDropdownResponseDto[]>([]);
  protected readonly modelos = signal<ModeloEquipoDropdownResponseDto[]>([]);
  protected readonly compatibilidades = signal<RepuestoModeloCompatibilidadResponseDto[]>([]);

  protected readonly showAddModal = signal(false);
  protected readonly showDeactivateModal = signal(false);
  protected selectedCompatibilidad: RepuestoModeloCompatibilidadResponseDto | null = null;

  protected readonly form = this.fb.nonNullable.group({
    marcaId: [0, [Validators.required, Validators.min(1)]],
    modeloEquipoId: [0, [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void {
    this.cargarCompatibilidades();
    this.cargarMarcas();
  }

  protected openAddModal(): void {
    this.form.reset({ marcaId: 0, modeloEquipoId: 0 });
    this.modelos.set([]);
    this.globalErrors.set([]);
    this.showAddModal.set(true);
  }

  protected closeAddModal(): void {
    this.showAddModal.set(false);
  }

  protected onMarcaChange(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    this.form.patchValue({ marcaId: value, modeloEquipoId: 0 });
    this.modelos.set([]);

    if (value > 0) {
      this.catalogosDropdown.listarModelosActivosPorMarca(value).subscribe({
        next: (items) => this.modelos.set(items),
        error: () => this.globalErrors.set(['No se pudieron cargar los modelos para la marca seleccionada.'])
      });
    }
  }

  protected agregarCompatibilidad(): void {
    this.form.markAllAsTouched();
    this.globalErrors.set([]);

    if (this.form.invalid) {
      return;
    }

    this.saving.set(true);
    const payload: RepuestoModeloCompatibilidadCreateRequestDto = {
      modeloEquipoId: this.form.getRawValue().modeloEquipoId
    };

    this.repuestosApi.agregarCompatibilidad(this.repuestoId(), payload).subscribe({
      next: () => {
        this.closeAddModal();
        this.cargarCompatibilidades();
      },
      error: (error: unknown) => {
        this.saving.set(false);
        this.globalErrors.set(mapBackendErrorsToForm(this.form, error));
      },
      complete: () => this.saving.set(false)
    });
  }

  protected confirmDeactivate(item: RepuestoModeloCompatibilidadResponseDto): void {
    this.selectedCompatibilidad = item;
    this.showDeactivateModal.set(true);
  }

  protected cancelDeactivate(): void {
    this.selectedCompatibilidad = null;
    this.showDeactivateModal.set(false);
  }

  protected desactivarSeleccionada(): void {
    const selected = this.selectedCompatibilidad;
    if (!selected) {
      return;
    }

    this.repuestosApi.desactivarCompatibilidad(this.repuestoId(), selected.id).subscribe({
      next: () => {
        this.cancelDeactivate();
        this.cargarCompatibilidades();
      },
      error: () => {
        this.errorMessage.set('No se pudo desactivar la compatibilidad. Intentá nuevamente.');
        this.cancelDeactivate();
      }
    });
  }

  protected hasError(controlName: 'marcaId' | 'modeloEquipoId'): boolean {
    const ctrl = this.form.get(controlName);
    return !!ctrl && ctrl.invalid && (ctrl.touched || ctrl.dirty);
  }

  protected controlError(controlName: 'marcaId' | 'modeloEquipoId'): string {
    const ctrl = this.form.get(controlName);
    const errors = ctrl?.errors;

    if (!errors) {
      return '';
    }

    if (typeof errors['backend'] === 'string') {
      return errors['backend'] as string;
    }

    if (errors['required'] || errors['min']) {
      return 'Este campo es obligatorio.';
    }

    return 'Valor inválido.';
  }

  private cargarCompatibilidades(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.repuestosApi.listarCompatibilidades(this.repuestoId()).subscribe({
      next: (items) => {
        this.compatibilidades.set(items);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('No se pudieron cargar las compatibilidades del repuesto.');
        this.loading.set(false);
      }
    });
  }

  private cargarMarcas(): void {
    this.catalogosDropdown.listarMarcasActivas().subscribe({
      next: (items) => this.marcas.set(items),
      error: () => this.globalErrors.set(['No se pudieron cargar las marcas para el alta de compatibilidades.'])
    });
  }
}
