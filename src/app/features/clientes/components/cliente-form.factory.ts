import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteResponseDto } from '../models/cliente.model';

export interface ClienteFormGroup {
  tipoCliente: FormControl<'PERSONA' | 'EMPRESA'>;
  nombre: FormControl<string>;
  apellido: FormControl<string>;
  razonSocial: FormControl<string>;
  tipoDocumento: FormControl<string>;
  numeroDocumento: FormControl<string>;
  cuit: FormControl<string>;
  telefonoPrincipal: FormControl<string>;
  telefonoAlternativo: FormControl<string>;
  email: FormControl<string>;
  calle: FormControl<string>;
  numero: FormControl<string>;
  piso: FormControl<string>;
  departamento: FormControl<string>;
  ciudad: FormControl<string>;
  provincia: FormControl<string>;
  codigoPostal: FormControl<string>;
  referenciaDomicilio: FormControl<string>;
  observaciones: FormControl<string>;
}

export function createClienteForm(fb: FormBuilder, source?: Partial<ClienteResponseDto>): FormGroup<ClienteFormGroup> {
  return fb.nonNullable.group({
    tipoCliente: (source?.tipoCliente ?? 'PERSONA') as 'PERSONA' | 'EMPRESA',
    nombre: source?.nombre ?? '',
    apellido: source?.apellido ?? '',
    razonSocial: source?.razonSocial ?? '',
    tipoDocumento: source?.tipoDocumento ?? '',
    numeroDocumento: [source?.numeroDocumento ?? '', [Validators.required]],
    cuit: source?.cuit ?? '',
    telefonoPrincipal: [source?.telefonoPrincipal ?? '', [Validators.required]],
    telefonoAlternativo: source?.telefonoAlternativo ?? '',
    email: [source?.email ?? '', [Validators.required, Validators.email]],
    calle: [source?.calle ?? '', [Validators.required]],
    numero: [source?.numero ?? '', [Validators.required]],
    piso: source?.piso ?? '',
    departamento: source?.departamento ?? '',
    ciudad: [source?.ciudad ?? '', [Validators.required]],
    provincia: [source?.provincia ?? '', [Validators.required]],
    codigoPostal: [source?.codigoPostal ?? '', [Validators.required]],
    referenciaDomicilio: source?.referenciaDomicilio ?? '',
    observaciones: source?.observaciones ?? ''
  });
}
