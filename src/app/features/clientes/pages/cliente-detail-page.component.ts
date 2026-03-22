import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ClienteResponseDto, nombreCliente } from '../models/cliente.model';
import { ClientesApiService } from '../services/clientes-api.service';

@Component({
  selector: 'app-cliente-detail-page',
  standalone: true,
  imports: [RouterLink, PageHeaderComponent],
  templateUrl: './cliente-detail-page.component.html',
  styleUrl: './cliente-detail-page.component.scss'
})
export class ClienteDetailPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly clientesApi = inject(ClientesApiService);

  protected readonly loading = signal(true);
  protected readonly error = signal('');
  protected readonly cliente = signal<ClienteResponseDto | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clientesApi.obtenerPorId(id).subscribe({
      next: (data) => {
        this.cliente.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No fue posible cargar el detalle del cliente.');
        this.loading.set(false);
      }
    });
  }

  protected nombrePrincipal(): string {
    const item = this.cliente();
    if (!item) {
      return '-';
    }

    return nombreCliente(item);
  }
}
