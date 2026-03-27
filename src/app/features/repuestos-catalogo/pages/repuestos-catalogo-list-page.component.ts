import { NgClass } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { RepuestoCatalogoListItemResponseDto } from '../models/repuesto-catalogo.model';
import { RepuestosCatalogoApiService } from '../services/repuestos-catalogo-api.service';

interface SortState {
  key: 'tipoRepuestoNombre' | 'nombre' | 'descripcion' | 'estado';
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-repuestos-catalogo-list-page',
  standalone: true,
  imports: [RouterLink, NgClass, PageHeaderComponent, EmptyStateComponent, ConfirmModalComponent],
  templateUrl: './repuestos-catalogo-list-page.component.html',
  styleUrl: './repuestos-catalogo-list-page.component.scss'
})
export class RepuestosCatalogoListPageComponent implements OnInit {
  private readonly repuestosApi = inject(RepuestosCatalogoApiService);

  protected readonly loading = signal(true);
  protected readonly errorMessage = signal('');
  protected readonly items = signal<RepuestoCatalogoListItemResponseDto[]>([]);
  protected readonly sortState = signal<SortState>({ key: 'nombre', direction: 'asc' });

  protected readonly showDeactivateModal = signal(false);
  protected selectedItem: RepuestoCatalogoListItemResponseDto | null = null;

  protected readonly sortedItems = computed(() => {
    const state = this.sortState();
    const records = [...this.items()];

    const getComparable = (item: RepuestoCatalogoListItemResponseDto): string => {
      switch (state.key) {
        case 'tipoRepuestoNombre':
          return item.tipoRepuestoNombre.toLowerCase();
        case 'nombre':
          return item.nombre.toLowerCase();
        case 'descripcion':
          return item.descripcion.toLowerCase();
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
    this.cargarRepuestos();
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

  protected confirmDeactivate(item: RepuestoCatalogoListItemResponseDto): void {
    this.selectedItem = item;
    this.showDeactivateModal.set(true);
  }

  protected cancelDeactivate(): void {
    this.selectedItem = null;
    this.showDeactivateModal.set(false);
  }

  protected desactivarSeleccionado(): void {
    if (!this.selectedItem) {
      return;
    }

    this.repuestosApi.desactivar(this.selectedItem.id).subscribe({
      next: () => {
        this.cancelDeactivate();
        this.cargarRepuestos();
      },
      error: () => {
        this.errorMessage.set('No se pudo desactivar el repuesto. Intentá nuevamente.');
        this.cancelDeactivate();
      }
    });
  }

  private cargarRepuestos(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.repuestosApi.listar().subscribe({
      next: (items) => {
        this.items.set(items);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('No fue posible cargar el listado de repuestos de catálogo.');
        this.loading.set(false);
      }
    });
  }
}
