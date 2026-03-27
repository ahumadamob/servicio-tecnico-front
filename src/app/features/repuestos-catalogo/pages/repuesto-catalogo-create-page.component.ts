import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { mapBackendErrorsToForm } from '../../../shared/utils/form-error.mapper';
import { RepuestoCatalogoFormComponent } from '../components/repuesto-catalogo-form.component';
import { createRepuestoCatalogoForm } from '../components/repuesto-catalogo-form.factory';
import { RepuestoCatalogoCreateRequestDto } from '../models/repuesto-catalogo.model';
import { RepuestosCatalogoApiService } from '../services/repuestos-catalogo-api.service';
import { TiposRepuestoApiService } from '../../tipos-repuesto/services/tipos-repuesto-api.service';
import { TipoRepuestoDropdownResponseDto } from '../../tipos-repuesto/models/tipo-repuesto.model';

@Component({
  selector: 'app-repuesto-catalogo-create-page',
  standalone: true,
  imports: [ReactiveFormsModule, PageHeaderComponent, RepuestoCatalogoFormComponent],
  templateUrl: './repuesto-catalogo-create-page.component.html'
})
export class RepuestoCatalogoCreatePageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly repuestosApi = inject(RepuestosCatalogoApiService);
  private readonly tiposApi = inject(TiposRepuestoApiService);
  private readonly router = inject(Router);

  protected readonly form = createRepuestoCatalogoForm(this.fb);
  protected readonly tiposRepuesto = signal<TipoRepuestoDropdownResponseDto[]>([]);
  protected readonly globalErrors = signal<string[]>([]);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);

  ngOnInit(): void {
    this.tiposApi.dropdownActivos().subscribe({
      next: (items) => {
        this.tiposRepuesto.set(items);
        this.loading.set(false);
      },
      error: () => {
        this.globalErrors.set(['No se pudieron cargar los tipos de repuesto.']);
        this.loading.set(false);
      }
    });
  }

  protected save(): void {
    this.globalErrors.set([]);
    this.saving.set(true);

    const payload = this.form.getRawValue() as RepuestoCatalogoCreateRequestDto;
    this.repuestosApi.crear(payload).subscribe({
      next: (created) => this.router.navigate(['/repuestos-catalogo', created.id]),
      error: (error: unknown) => {
        this.saving.set(false);
        this.globalErrors.set(mapBackendErrorsToForm(this.form, error));
      },
      complete: () => this.saving.set(false)
    });
  }

  protected cancel(): void {
    void this.router.navigate(['/repuestos-catalogo']);
  }
}
