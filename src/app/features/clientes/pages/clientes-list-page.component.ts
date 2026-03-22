import { NgClass } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ClienteListItemResponseDto, nombreCliente } from '../models/cliente.model';
import { ClientesApiService } from '../services/clientes-api.service';

interface SortState {
  key: 'tipoCliente' | 'nombre' | 'numeroDocumento' | 'telefonoPrincipal' | 'email' | 'estado';
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-clientes-list-page',
  standalone: true,
  imports: [RouterLink, NgClass, PageHeaderComponent, EmptyStateComponent, ConfirmModalComponent],
  templateUrl: './clientes-list-page.component.html',
  styleUrl: './clientes-list-page.component.scss'
})
export class ClientesListPageComponent implements OnInit {
  private readonly clientesApi = inject(ClientesApiService);

  protected readonly loading = signal(true);
  protected readonly errorMessage = signal('');
  protected readonly clientes = signal<ClienteListItemResponseDto[]>([]);
  protected readonly sortState = signal<SortState>({ key: 'nombre', direction: 'asc' });

  protected readonly showDeactivateModal = signal(false);
  protected selectedCliente: ClienteListItemResponseDto | null = null;

  protected readonly sortedClientes = computed(() => {
    const state = this.sortState();
    const records = [...this.clientes()];

    const getComparable = (item: ClienteListItemResponseDto): string => {
      switch (state.key) {
        case 'tipoCliente':
          return item.tipoCliente;
        case 'nombre':
          return nombreCliente(item).toLowerCase();
        case 'numeroDocumento':
          return item.numeroDocumento.toLowerCase();
        case 'telefonoPrincipal':
          return item.telefonoPrincipal.toLowerCase();
        case 'email':
          return item.email.toLowerCase();
        case 'estado':
          return item.activo ? 'activo' : 'inactivo';
      }
    };

    records.sort((a, b) => {
      const va = getComparable(a);
      const vb = getComparable(b);
      return state.direction === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    });

    return records;
  });

  ngOnInit(): void {
    this.cargarClientes();
  }

  protected ordenarPor(key: SortState['key']): void {
    const current = this.sortState();
    const nextDirection = current.key === key && current.direction === 'asc' ? 'desc' : 'asc';
    this.sortState.set({ key, direction: nextDirection });
  }

  protected sortIconFor(key: SortState['key']): string {
    const current = this.sortState();
    if (current.key !== key) {
      return 'bi-arrow-down-up';
    }
    return current.direction === 'asc' ? 'bi-sort-alpha-down' : 'bi-sort-alpha-up';
  }

  protected nombreOrRazonSocial(item: ClienteListItemResponseDto): string {
    return nombreCliente(item);
  }

  protected confirmDeactivate(item: ClienteListItemResponseDto): void {
    this.selectedCliente = item;
    this.showDeactivateModal.set(true);
  }

  protected cancelDeactivate(): void {
    this.selectedCliente = null;
    this.showDeactivateModal.set(false);
  }

  protected desactivarSeleccionado(): void {
    if (!this.selectedCliente) {
      return;
    }

    this.clientesApi.desactivar(this.selectedCliente.id).subscribe({
      next: () => {
        this.cancelDeactivate();
        this.cargarClientes();
      },
      error: () => {
        this.errorMessage.set('No se pudo desactivar el cliente. Intentá nuevamente.');
        this.cancelDeactivate();
      }
    });
  }

  private cargarClientes(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.clientesApi.listar().subscribe({
      next: (items) => {
        this.clientes.set(items);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('No fue posible cargar el listado de clientes.');
        this.loading.set(false);
      }
    });
  }
}
