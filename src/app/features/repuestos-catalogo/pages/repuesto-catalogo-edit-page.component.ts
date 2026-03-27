import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { mapBackendErrorsToForm } from '../../../shared/utils/form-error.mapper';
import { TipoRepuestoDropdownResponseDto } from '../../tipos-repuesto/models/tipo-repuesto.model';
import { TiposRepuestoApiService } from '../../tipos-repuesto/services/tipos-repuesto-api.service';
import { RepuestoCatalogoFormComponent } from '../components/repuesto-catalogo-form.component';
import { createRepuestoCatalogoForm } from '../components/repuesto-catalogo-form.factory';
import { RepuestoCatalogoUpdateRequestDto } from '../models/repuesto-catalogo.model';
import { RepuestosCatalogoApiService } from '../services/repuestos-catalogo-api.service';

@Component({
  selector: 'app-repuesto-catalogo-edit-page',
  standalone: true,
  imports: [ReactiveFormsModule, PageHeaderComponent, RepuestoCatalogoFormComponent],
  templateUrl: './repuesto-catalogo-edit-page.component.html'
})
export class RepuestoCatalogoEditPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly repuestosApi = inject(RepuestosCatalogoApiService);
  private readonly tiposApi = inject(TiposRepuestoApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly form = createRepuestoCatalogoForm(this.fb);
  protected readonly tiposRepuesto = signal<TipoRepuestoDropdownResponseDto[]>([]);
  protected readonly globalErrors = signal<string[]>([]);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected repuestoId = 0;

  ngOnInit(): void {
    this.repuestoId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarDatos();
  }

  protected save(): void {
    this.globalErrors.set([]);
    this.saving.set(true);

    const payload = this.form.getRawValue() as RepuestoCatalogoUpdateRequestDto;
    this.repuestosApi.actualizar(this.repuestoId, payload).subscribe({
      next: () => this.router.navigate(['/repuestos-catalogo', this.repuestoId]),
      error: (error: unknown) => {
        this.saving.set(false);
        this.globalErrors.set(mapBackendErrorsToForm(this.form, error));
      },
      complete: () => this.saving.set(false)
    });
  }

  protected cancel(): void {
    void this.router.navigate(['/repuestos-catalogo', this.repuestoId]);
  }

  private cargarDatos(): void {
    this.loading.set(true);
    this.globalErrors.set([]);

    this.tiposApi.dropdownActivos().subscribe({
      next: (tipos) => {
        this.tiposRepuesto.set(tipos);

        this.repuestosApi.obtenerPorId(this.repuestoId).subscribe({
          next: (item) => {
            this.form.patchValue({
              tipoRepuestoId: item.tipoRepuesto.id,
              nombre: item.nombre,
              descripcion: item.descripcion
            });
            this.loading.set(false);
          },
          error: () => {
            this.globalErrors.set(['No se pudo cargar el repuesto solicitado.']);
            this.loading.set(false);
          }
        });
      },
      error: () => {
        this.globalErrors.set(['No se pudieron cargar los tipos de repuesto.']);
        this.loading.set(false);
      }
    });
  }
}
