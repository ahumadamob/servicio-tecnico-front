import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { mapBackendErrorsToForm } from '../../../shared/utils/form-error.mapper';
import { createTipoRepuestoForm } from '../components/tipo-repuesto-form.factory';
import { TipoRepuestoFormComponent } from '../components/tipo-repuesto-form.component';
import { TipoRepuestoUpdateRequestDto } from '../models/tipo-repuesto.model';
import { TiposRepuestoApiService } from '../services/tipos-repuesto-api.service';

@Component({
  selector: 'app-tipo-repuesto-edit-page',
  standalone: true,
  imports: [ReactiveFormsModule, PageHeaderComponent, TipoRepuestoFormComponent],
  templateUrl: './tipo-repuesto-edit-page.component.html'
})
export class TipoRepuestoEditPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly tiposApi = inject(TiposRepuestoApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly form = createTipoRepuestoForm(this.fb);
  protected readonly globalErrors = signal<string[]>([]);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected tipoId = 0;

  ngOnInit(): void {
    this.tipoId = Number(this.route.snapshot.paramMap.get('id'));

    this.tiposApi.obtenerPorId(this.tipoId).subscribe({
      next: (tipo) => {
        this.form.patchValue({ nombre: tipo.nombre });
        this.loading.set(false);
      },
      error: () => {
        this.globalErrors.set(['No se pudo cargar el tipo de repuesto solicitado.']);
        this.loading.set(false);
      }
    });
  }

  protected save(): void {
    this.globalErrors.set([]);
    this.saving.set(true);

    const payload = this.form.getRawValue() as TipoRepuestoUpdateRequestDto;
    this.tiposApi.actualizar(this.tipoId, payload).subscribe({
      next: () => this.router.navigate(['/tipos-repuesto', this.tipoId]),
      error: (error: unknown) => {
        this.saving.set(false);
        this.globalErrors.set(mapBackendErrorsToForm(this.form, error));
      },
      complete: () => this.saving.set(false)
    });
  }

  protected cancel(): void {
    void this.router.navigate(['/tipos-repuesto', this.tipoId]);
  }
}
