import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { TecnicoDropdownResponseDto } from '../../shared/models/dropdown.model';
import { TecnicosDropdownService } from '../../shared/services/tecnicos-dropdown.service';
import { OrdenTrabajoListItemResponseDto } from './models/ordenes.model';
import { OrdenesApiService } from './services/ordenes-api.service';

type SortableField = 'codigoOrden' | 'fechaIngreso' | 'estado' | 'clienteNombre' | 'tecnicoNombre';
type SortDirection = 'asc' | 'desc';

interface ListState {
  page: number;
  size: number;
  sort: string;
  busqueda?: string;
  estado?: string;
  tecnicoId?: number;
  fechaDesde?: string;
  fechaHasta?: string;
}

const DEFAULT_STATE: ListState = {
  page: 0,
  size: 20,
  sort: 'fechaIngreso,desc'
};

@Component({
  selector: 'app-ordenes',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, NgClass, PageHeaderComponent, EmptyStateComponent],
  templateUrl: './ordenes.component.html',
  styleUrl: './ordenes.component.scss'
})
export class OrdenesComponent implements OnInit {
  private readonly ordenesApi = inject(OrdenesApiService);
  private readonly tecnicosDropdownService = inject(TecnicosDropdownService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly ordenes = signal<OrdenTrabajoListItemResponseDto[]>([]);
  protected readonly tecnicos = signal<TecnicoDropdownResponseDto[]>([]);

  protected readonly page = signal(DEFAULT_STATE.page);
  protected readonly size = signal(DEFAULT_STATE.size);
  protected readonly totalElements = signal(0);
  protected readonly totalPages = signal(0);
  protected readonly sort = signal(DEFAULT_STATE.sort);

  protected readonly filtersForm = this.fb.nonNullable.group({
    busqueda: '',
    estado: '',
    tecnicoId: '',
    fechaDesde: '',
    fechaHasta: ''
  });

  ngOnInit(): void {
    const stateFromUrl = this.readStateFromUrl();
    this.patchForm(stateFromUrl);
    this.page.set(stateFromUrl.page);
    this.size.set(stateFromUrl.size);
    this.sort.set(stateFromUrl.sort);

    this.cargarTecnicos();
    this.cargarOrdenes(stateFromUrl);
  }

  protected aplicarFiltros(): void {
    this.updateRouteAndLoad({ page: 0 });
  }

  protected limpiarFiltros(): void {
    this.filtersForm.reset({
      busqueda: '',
      estado: '',
      tecnicoId: '',
      fechaDesde: '',
      fechaHasta: ''
    });

    this.updateRouteAndLoad({
      page: 0,
      size: DEFAULT_STATE.size,
      sort: DEFAULT_STATE.sort
    });
  }

  protected reintentar(): void {
    this.updateRouteAndLoad();
  }

  protected toggleSort(field: SortableField): void {
    const [currentField, currentDirection] = this.sort().split(',') as [SortableField, SortDirection];
    const nextDirection: SortDirection =
      currentField === field && currentDirection === 'asc' ? 'desc' : 'asc';

    this.updateRouteAndLoad({ page: 0, sort: `${field},${nextDirection}` });
  }

  protected sortIconFor(field: SortableField): string {
    const [currentField, currentDirection] = this.sort().split(',') as [SortableField, SortDirection];

    if (currentField !== field) {
      return 'bi-arrow-down-up';
    }

    return currentDirection === 'asc' ? 'bi-sort-alpha-down' : 'bi-sort-alpha-up';
  }

  protected goToPage(nextPage: number): void {
    if (nextPage < 0 || nextPage >= this.totalPages()) {
      return;
    }

    this.updateRouteAndLoad({ page: nextPage });
  }

  protected onPageSizeChange(event: Event): void {
    const nextSize = Number((event.target as HTMLSelectElement).value);
    this.updateRouteAndLoad({ page: 0, size: nextSize });
  }

  protected rangeStart(): number {
    if (!this.totalElements()) {
      return 0;
    }

    return this.page() * this.size() + 1;
  }

  protected rangeEnd(): number {
    if (!this.totalElements()) {
      return 0;
    }

    return Math.min((this.page() + 1) * this.size(), this.totalElements());
  }

  private cargarTecnicos(): void {
    this.tecnicosDropdownService.listarTecnicosActivos().subscribe({
      next: (items) => this.tecnicos.set(items),
      error: () => this.tecnicos.set([])
    });
  }

  private updateRouteAndLoad(overrides: Partial<ListState> = {}): void {
    const nextState = { ...this.currentStateFromControls(), ...overrides };

    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.toQueryParams(nextState)
    });

    this.cargarOrdenes(nextState);
  }

  private cargarOrdenes(state: ListState): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.ordenesApi.listar(state).subscribe({
      next: (response) => {
        this.ordenes.set(response.content);
        this.page.set(response.page);
        this.size.set(response.size);
        this.totalElements.set(response.totalElements);
        this.totalPages.set(response.totalPages);
        this.sort.set(state.sort);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('No fue posible cargar el listado de órdenes.');
        this.ordenes.set([]);
        this.totalElements.set(0);
        this.totalPages.set(0);
        this.loading.set(false);
      }
    });
  }

  private currentStateFromControls(): ListState {
    const raw = this.filtersForm.getRawValue();
    const tecnicoId = raw.tecnicoId ? Number(raw.tecnicoId) : undefined;

    return {
      page: this.page(),
      size: this.size(),
      sort: this.sort(),
      busqueda: raw.busqueda.trim() || undefined,
      estado: raw.estado.trim() || undefined,
      tecnicoId,
      fechaDesde: raw.fechaDesde || undefined,
      fechaHasta: raw.fechaHasta || undefined
    };
  }

  private readStateFromUrl(): ListState {
    const query = this.route.snapshot.queryParamMap;
    const page = Number(query.get('page'));
    const size = Number(query.get('size'));
    const sort = query.get('sort') || DEFAULT_STATE.sort;
    const tecnicoIdParam = query.get('tecnicoId');

    return {
      page: Number.isInteger(page) && page >= 0 ? page : DEFAULT_STATE.page,
      size: Number.isInteger(size) && size > 0 ? size : DEFAULT_STATE.size,
      sort,
      busqueda: query.get('busqueda') || undefined,
      estado: query.get('estado') || undefined,
      tecnicoId: tecnicoIdParam ? Number(tecnicoIdParam) : undefined,
      fechaDesde: query.get('fechaDesde') || undefined,
      fechaHasta: query.get('fechaHasta') || undefined
    };
  }

  private patchForm(state: ListState): void {
    this.filtersForm.patchValue({
      busqueda: state.busqueda ?? '',
      estado: state.estado ?? '',
      tecnicoId: state.tecnicoId ? String(state.tecnicoId) : '',
      fechaDesde: state.fechaDesde ?? '',
      fechaHasta: state.fechaHasta ?? ''
    });
  }

  private toQueryParams(state: ListState): Record<string, string | number> {
    const params: Record<string, string | number> = {
      page: state.page,
      size: state.size,
      sort: state.sort
    };

    if (state.busqueda) {
      params['busqueda'] = state.busqueda;
    }

    if (state.estado) {
      params['estado'] = state.estado;
    }

    if (state.tecnicoId !== undefined) {
      params['tecnicoId'] = state.tecnicoId;
    }

    if (state.fechaDesde) {
      params['fechaDesde'] = state.fechaDesde;
    }

    if (state.fechaHasta) {
      params['fechaHasta'] = state.fechaHasta;
    }

    return params;
  }
}
