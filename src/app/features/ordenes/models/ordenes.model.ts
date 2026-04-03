export interface OrdenTrabajoListItemResponseDto {
  id: number;
  codigoOrden: string;
  codigoSeguimientoPublico: string;
  fechaIngreso: string;
  estado: string;
  clienteNombre: string;
  telefonoPrincipal: string;
  marcaNombre: string;
  modeloNombre: string;
  imeiSerie: string;
  tecnicoNombre: string;
}

export interface PagedResponseDtoOrdenTrabajoListItemResponseDto {
  content: OrdenTrabajoListItemResponseDto[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface OrdenesListQueryParams {
  page: number;
  size: number;
  sort: string;
  busqueda?: string;
  estado?: string;
  tecnicoId?: number;
  fechaDesde?: string;
  fechaHasta?: string;
}
