import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RepuestoCatalogoResponseDto } from '../models/repuesto-catalogo.model';

export interface RepuestoCatalogoFormGroup {
  tipoRepuestoId: FormControl<number | null>;
  nombre: FormControl<string>;
  descripcion: FormControl<string>;
}

export function createRepuestoCatalogoForm(
  fb: FormBuilder,
  source?: Partial<RepuestoCatalogoResponseDto>
): FormGroup<RepuestoCatalogoFormGroup> {
  return fb.group<RepuestoCatalogoFormGroup>({
    tipoRepuestoId: new FormControl<number | null>(source?.tipoRepuesto?.id ?? null, [Validators.required]),
    nombre: new FormControl<string>(source?.nombre ?? '', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)]
    }),
    descripcion: new FormControl<string>(source?.descripcion ?? '', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(500)]
    })
  });
}
