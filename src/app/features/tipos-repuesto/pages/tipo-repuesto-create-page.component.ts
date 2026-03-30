import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { mapBackendErrorsToForm } from '../../../shared/utils/form-error.mapper';
import { createTipoRepuestoForm } from '../components/tipo-repuesto-form.factory';
import { TipoRepuestoFormComponent } from '../components/tipo-repuesto-form.component';
import { TipoRepuestoCreateRequestDto } from '../models/tipo-repuesto.model';
import { TiposRepuestoApiService } from '../services/tipos-repuesto-api.service';

@Component({
  selector: 'app-tipo-repuesto-create-page',
  standalone: true,
  imports: [ReactiveFormsModule, PageHeaderComponent, TipoRepuestoFormComponent],
  templateUrl: './tipo-repuesto-create-page.component.html'
})
export class TipoRepuestoCreatePageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly tiposApi = inject(TiposRepuestoApiService);
  private readonly router = inject(Router);

  protected readonly form = createTipoRepuestoForm(this.fb);
  protected readonly globalErrors = signal<string[]>([]);
  protected readonly saving = signal(false);

  protected save(): void {
    this.globalErrors.set([]);
    this.saving.set(true);

    const payload = this.form.getRawValue() as TipoRepuestoCreateRequestDto;
    this.tiposApi.crear(payload).subscribe({
      next: (created) => this.router.navigate(['/tipos-repuesto', created.id]),
      error: (error: unknown) => {
        this.saving.set(false);
        this.globalErrors.set(mapBackendErrorsToForm(this.form, error));
      },
      complete: () => this.saving.set(false)
    });
  }

  protected cancel(): void {
    void this.router.navigate(['/tipos-repuesto']);
  }
}
