import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { mapBackendErrorsToForm } from '../../../shared/utils/form-error.mapper';
import { createTecnicoForm } from '../components/tecnico-form.factory';
import { TecnicoFormComponent } from '../components/tecnico-form.component';
import { TecnicoUpsertRequestDto } from '../models/tecnico.model';
import { TecnicosApiService } from '../services/tecnicos-api.service';

@Component({
  selector: 'app-tecnico-edit-page',
  standalone: true,
  imports: [ReactiveFormsModule, PageHeaderComponent, TecnicoFormComponent],
  templateUrl: './tecnico-edit-page.component.html'
})
export class TecnicoEditPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly tecnicosApi = inject(TecnicosApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly form = createTecnicoForm(this.fb);
  protected readonly globalErrors = signal<string[]>([]);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected tecnicoId = 0;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.tecnicoId = id;

    this.tecnicosApi.obtenerPorId(id).subscribe({
      next: (tecnico) => {
        this.form.patchValue({
          nombre: tecnico.nombre,
          apellido: tecnico.apellido,
          telefono: tecnico.telefono,
          email: tecnico.email ?? ''
        });
        this.loading.set(false);
      },
      error: () => {
        this.globalErrors.set(['No se pudo cargar el técnico solicitado.']);
        this.loading.set(false);
      }
    });
  }

  protected save(): void {
    this.globalErrors.set([]);
    this.saving.set(true);

    const payload = this.form.getRawValue() as TecnicoUpsertRequestDto;
    this.tecnicosApi.actualizar(this.tecnicoId, payload).subscribe({
      next: () => this.router.navigate(['/tecnicos', this.tecnicoId]),
      error: (error: unknown) => {
        this.saving.set(false);
        this.globalErrors.set(mapBackendErrorsToForm(this.form, error));
      },
      complete: () => this.saving.set(false)
    });
  }

  protected cancel(): void {
    void this.router.navigate(['/tecnicos', this.tecnicoId]);
  }
}
