import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { mapBackendErrorsToForm } from '../../../shared/utils/form-error.mapper';
import { createTecnicoForm } from '../components/tecnico-form.factory';
import { TecnicoFormComponent } from '../components/tecnico-form.component';
import { TecnicoUpsertRequestDto } from '../models/tecnico.model';
import { TecnicosApiService } from '../services/tecnicos-api.service';

@Component({
  selector: 'app-tecnico-create-page',
  standalone: true,
  imports: [ReactiveFormsModule, PageHeaderComponent, TecnicoFormComponent],
  templateUrl: './tecnico-create-page.component.html'
})
export class TecnicoCreatePageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly tecnicosApi = inject(TecnicosApiService);
  private readonly router = inject(Router);

  protected readonly form = createTecnicoForm(this.fb);
  protected readonly globalErrors = signal<string[]>([]);
  protected readonly saving = signal(false);

  protected save(): void {
    this.globalErrors.set([]);
    this.saving.set(true);

    const payload = this.form.getRawValue() as TecnicoUpsertRequestDto;
    this.tecnicosApi.crear(payload).subscribe({
      next: (tecnico) => this.router.navigate(['/tecnicos', tecnico.id]),
      error: (error: unknown) => {
        this.saving.set(false);
        this.globalErrors.set(mapBackendErrorsToForm(this.form, error));
      },
      complete: () => this.saving.set(false)
    });
  }

  protected cancel(): void {
    void this.router.navigate(['/tecnicos']);
  }
}
