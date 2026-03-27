export interface RepuestoCatalogoListItemResponseDto {
  id: number;
  tipoRepuestoNombre: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
}

export interface RepuestoCatalogoResponseDto {
  id: number;
  tipoRepuesto: {
    id: number;
    nombre: string;
  };
  nombre: string;
  descripcion: string;
  activo: boolean;
}

export interface RepuestoCatalogoCreateRequestDto {
  tipoRepuestoId: number;
  nombre: string;
  descripcion: string;
}

export interface RepuestoCatalogoUpdateRequestDto {
  tipoRepuestoId: number;
  nombre: string;
  descripcion: string;
}

export interface RepuestoCatalogoDropdownResponseDto {
  id: number;
  nombre: string;
}

export interface RepuestoModeloCompatibilidadCreateRequestDto {
  modeloEquipoId: number;
}

export interface RepuestoModeloCompatibilidadResponseDto {
  id: number;
  modeloEquipoId: number;
  modeloEquipoNombre: string;
  marcaNombre: string;
  activo: boolean;
}
