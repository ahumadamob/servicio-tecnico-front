export interface TipoRepuestoListItemResponseDto {
  id: number;
  nombre: string;
  activo: boolean;
}

export interface TipoRepuestoResponseDto {
  id: number;
  nombre: string;
  activo: boolean;
}

export interface TipoRepuestoCreateRequestDto {
  nombre: string;
}

export interface TipoRepuestoUpdateRequestDto {
  nombre: string;
}

export interface TipoRepuestoDropdownResponseDto {
  id: number;
  nombre: string;
}
