import { NgClass } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { nombreCompletoTecnico, TecnicoListItemResponseDto } from '../models/tecnico.model';
import { TecnicosApiService } from '../services/tecnicos-api.service';

interface SortState {
  key: 'nombre' | 'apellido' | 'telefono' | 'email' | 'estado';
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-tecnicos-list-page',
  standalone: true,
  imports: [RouterLink, NgClass, PageHeaderComponent, EmptyStateComponent, ConfirmModalComponent],
  templateUrl: './tecnicos-list-page.component.html',
  styleUrl: './tecnicos-list-page.component.scss'
})
export class TecnicosListPageComponent implements OnInit {
  private readonly tecnicosApi = inject(TecnicosApiService);

  protected readonly loading = signal(true);
  protected readonly errorMessage = signal('');
  protected readonly tecnicos = signal<TecnicoListItemResponseDto[]>([]);
  protected readonly sortState = signal<SortState>({ key: 'apellido', direction: 'asc' });

  protected readonly showDeactivateModal = signal(false);
  protected selectedTecnico: TecnicoListItemResponseDto | null = null;

  protected readonly sortedTecnicos = computed(() => {
    const state = this.sortState();
    const records = [...this.tecnicos()];

    const getComparable = (item: TecnicoListItemResponseDto): string => {
      switch (state.key) {
        case 'nombre':
          return item.nombre.toLowerCase();
        case 'apellido':
          return item.apellido.toLowerCase();
        case 'telefono':
          return item.telefono.toLowerCase();
        case 'email':
          return (item.email ?? '').toLowerCase();
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
    this.cargarTecnicos();
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

  protected nombreCompleto(item: TecnicoListItemResponseDto): string {
    return nombreCompletoTecnico(item);
  }

  protected confirmDeactivate(item: TecnicoListItemResponseDto): void {
    this.selectedTecnico = item;
    this.showDeactivateModal.set(true);
  }

  protected cancelDeactivate(): void {
    this.selectedTecnico = null;
    this.showDeactivateModal.set(false);
  }

  protected desactivarSeleccionado(): void {
    if (!this.selectedTecnico) {
      return;
    }

    this.tecnicosApi.desactivar(this.selectedTecnico.id).subscribe({
      next: () => {
        this.cancelDeactivate();
        this.cargarTecnicos();
      },
      error: () => {
        this.errorMessage.set('No se pudo desactivar el técnico. Intentá nuevamente.');
        this.cancelDeactivate();
      }
    });
  }

  private cargarTecnicos(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.tecnicosApi.listar().subscribe({
      next: (items) => {
        this.tecnicos.set(items);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('No fue posible cargar el listado de técnicos.');
        this.loading.set(false);
      }
    });
  }
}
