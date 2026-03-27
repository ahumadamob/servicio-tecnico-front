import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoRepuestoResponseDto } from '../models/tipo-repuesto.model';

export interface TipoRepuestoFormGroup {
  nombre: FormControl<string>;
}

export function createTipoRepuestoForm(fb: FormBuilder, source?: Partial<TipoRepuestoResponseDto>): FormGroup<TipoRepuestoFormGroup> {
  return fb.nonNullable.group({
    nombre: [source?.nombre ?? '', [Validators.required, Validators.maxLength(100)]]
  });
}
