import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { mapBackendErrorsToForm } from '../../../shared/utils/form-error.mapper';
import { ClienteFormComponent } from '../components/cliente-form.component';
import { createClienteForm } from '../components/cliente-form.factory';
import { ClienteUpsertRequestDto } from '../models/cliente.model';
import { ClientesApiService } from '../services/clientes-api.service';

@Component({
  selector: 'app-cliente-create-page',
  standalone: true,
  imports: [ReactiveFormsModule, PageHeaderComponent, ClienteFormComponent],
  templateUrl: './cliente-create-page.component.html'
})
export class ClienteCreatePageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly clientesApi = inject(ClientesApiService);
  private readonly router = inject(Router);

  protected readonly form = createClienteForm(this.fb);
  protected readonly globalErrors = signal<string[]>([]);
  protected readonly saving = signal(false);

  protected save(): void {
    this.globalErrors.set([]);
    this.saving.set(true);

    const payload = this.form.getRawValue() as ClienteUpsertRequestDto;
    this.clientesApi.crear(payload).subscribe({
      next: (cliente) => this.router.navigate(['/clientes', cliente.id]),
      error: (error: unknown) => {
        this.saving.set(false);
        this.globalErrors.set(mapBackendErrorsToForm(this.form, error));
      },
      complete: () => this.saving.set(false)
    });
  }

  protected cancel(): void {
    void this.router.navigate(['/clientes']);
  }
}
