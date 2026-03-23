import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TecnicoResponseDto } from '../models/tecnico.model';

export interface TecnicoFormGroup {
  nombre: FormControl<string>;
  apellido: FormControl<string>;
  telefono: FormControl<string>;
  email: FormControl<string>;
}

export function createTecnicoForm(fb: FormBuilder, source?: Partial<TecnicoResponseDto>): FormGroup<TecnicoFormGroup> {
  return fb.nonNullable.group({
    nombre: [source?.nombre ?? '', [Validators.required]],
    apellido: [source?.apellido ?? '', [Validators.required]],
    telefono: [source?.telefono ?? '', [Validators.required]],
    email: [source?.email ?? '', [Validators.email]]
  });
}
