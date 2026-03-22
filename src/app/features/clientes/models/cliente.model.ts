export type TipoCliente = 'PERSONA' | 'EMPRESA';

export interface ClienteListItemResponseDto {
  id: number;
  tipoCliente: TipoCliente;
  nombre?: string | null;
  apellido?: string | null;
  razonSocial?: string | null;
  numeroDocumento: string;
  email: string;
  telefonoPrincipal: string;
  activo: boolean;
}

export interface ClienteResponseDto {
  id: number;
  tipoCliente: TipoCliente;
  nombre?: string | null;
  apellido?: string | null;
  razonSocial?: string | null;
  tipoDocumento?: string | null;
  numeroDocumento: string;
  cuit?: string | null;
  telefonoPrincipal: string;
  telefonoAlternativo?: string | null;
  email: string;
  calle: string;
  numero: string;
  piso?: string | null;
  departamento?: string | null;
  ciudad: string;
  provincia: string;
  codigoPostal: string;
  referenciaDomicilio?: string | null;
  observaciones?: string | null;
  activo: boolean;
}

export interface ClienteUpsertRequestDto {
  tipoCliente: TipoCliente;
  nombre?: string | null;
  apellido?: string | null;
  razonSocial?: string | null;
  tipoDocumento?: string | null;
  numeroDocumento: string;
  cuit?: string | null;
  telefonoPrincipal: string;
  telefonoAlternativo?: string | null;
  email: string;
  calle: string;
  numero: string;
  piso?: string | null;
  departamento?: string | null;
  ciudad: string;
  provincia: string;
  codigoPostal: string;
  referenciaDomicilio?: string | null;
  observaciones?: string | null;
}

export function nombreCliente(item: Pick<ClienteListItemResponseDto, 'tipoCliente' | 'nombre' | 'apellido' | 'razonSocial'>): string {
  if (item.tipoCliente === 'EMPRESA') {
    return item.razonSocial?.trim() || '-';
  }

  const fullName = [item.nombre, item.apellido].filter(Boolean).join(' ').trim();
  return fullName || '-';
}
