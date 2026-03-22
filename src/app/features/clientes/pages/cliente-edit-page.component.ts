import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { mapBackendErrorsToForm } from '../../../shared/utils/form-error.mapper';
import { ClienteFormComponent } from '../components/cliente-form.component';
import { createClienteForm } from '../components/cliente-form.factory';
import { ClienteUpsertRequestDto } from '../models/cliente.model';
import { ClientesApiService } from '../services/clientes-api.service';

@Component({
  selector: 'app-cliente-edit-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, PageHeaderComponent, ClienteFormComponent],
  templateUrl: './cliente-edit-page.component.html'
})
export class ClienteEditPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly clientesApi = inject(ClientesApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly form = createClienteForm(this.fb);
  protected readonly globalErrors = signal<string[]>([]);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected clienteId = 0;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clienteId = id;

    this.clientesApi.obtenerPorId(id).subscribe({
      next: (cliente) => {
        this.form.patchValue({
          ...cliente,
          nombre: cliente.nombre ?? '',
          apellido: cliente.apellido ?? '',
          razonSocial: cliente.razonSocial ?? '',
          tipoDocumento: cliente.tipoDocumento ?? '',
          cuit: cliente.cuit ?? '',
          telefonoAlternativo: cliente.telefonoAlternativo ?? '',
          piso: cliente.piso ?? '',
          departamento: cliente.departamento ?? '',
          referenciaDomicilio: cliente.referenciaDomicilio ?? '',
          observaciones: cliente.observaciones ?? ''
        });
        this.loading.set(false);
      },
      error: () => {
        this.globalErrors.set(['No se pudo cargar el cliente solicitado.']);
        this.loading.set(false);
      }
    });
  }

  protected save(): void {
    this.globalErrors.set([]);
    this.saving.set(true);

    const payload = this.form.getRawValue() as ClienteUpsertRequestDto;
    this.clientesApi.actualizar(this.clienteId, payload).subscribe({
      next: () => this.router.navigate(['/clientes', this.clienteId]),
      error: (error: unknown) => {
        this.saving.set(false);
        this.globalErrors.set(mapBackendErrorsToForm(this.form, error));
      },
      complete: () => this.saving.set(false)
    });
  }

  protected cancel(): void {
    void this.router.navigate(['/clientes', this.clienteId]);
  }
}
