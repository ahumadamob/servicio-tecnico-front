import { NgClass } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { TipoRepuestoListItemResponseDto } from '../models/tipo-repuesto.model';
import { TiposRepuestoApiService } from '../services/tipos-repuesto-api.service';

interface SortState {
  key: 'nombre' | 'estado';
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-tipos-repuesto-list-page',
  standalone: true,
  imports: [RouterLink, NgClass, PageHeaderComponent, EmptyStateComponent, ConfirmModalComponent],
  templateUrl: './tipos-repuesto-list-page.component.html',
  styleUrl: './tipos-repuesto-list-page.component.scss'
})
export class TiposRepuestoListPageComponent implements OnInit {
  private readonly tiposApi = inject(TiposRepuestoApiService);

  protected readonly loading = signal(true);
  protected readonly errorMessage = signal('');
  protected readonly items = signal<TipoRepuestoListItemResponseDto[]>([]);
  protected readonly sortState = signal<SortState>({ key: 'nombre', direction: 'asc' });

  protected readonly showDeactivateModal = signal(false);
  protected selectedItem: TipoRepuestoListItemResponseDto | null = null;

  protected readonly sortedItems = computed(() => {
    const state = this.sortState();
    const records = [...this.items()];

    const getComparable = (item: TipoRepuestoListItemResponseDto): string => {
      switch (state.key) {
        case 'nombre':
          return item.nombre.toLowerCase();
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
    this.cargarTipos();
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

  protected confirmDeactivate(item: TipoRepuestoListItemResponseDto): void {
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

    this.tiposApi.desactivar(this.selectedItem.id).subscribe({
      next: () => {
        this.cancelDeactivate();
        this.cargarTipos();
      },
      error: () => {
        this.errorMessage.set('No se pudo desactivar el tipo de repuesto. Intentá nuevamente.');
        this.cancelDeactivate();
      }
    });
  }

  private cargarTipos(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.tiposApi.listar().subscribe({
      next: (items) => {
        this.items.set(items);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('No fue posible cargar el listado de tipos de repuesto.');
        this.loading.set(false);
      }
    });
  }
}
