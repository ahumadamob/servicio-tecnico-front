export interface TecnicoListItemResponseDto {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email?: string | null;
  activo: boolean;
}

export interface TecnicoResponseDto {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email?: string | null;
  activo: boolean;
}

export interface TecnicoUpsertRequestDto {
  nombre: string;
  apellido: string;
  telefono: string;
  email?: string | null;
}

export interface TecnicoDropdownResponseDto {
  id: number;
  nombreCompleto: string;
}

export function nombreCompletoTecnico(item: Pick<TecnicoListItemResponseDto, 'nombre' | 'apellido'>): string {
  return [item.nombre, item.apellido].filter(Boolean).join(' ').trim();
}
