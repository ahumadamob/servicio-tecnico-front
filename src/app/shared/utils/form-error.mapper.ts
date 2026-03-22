import { AbstractControl, FormGroup } from '@angular/forms';

interface FieldErrorEntry {
  field?: string;
  message?: string;
}

function addError(control: AbstractControl | null, message: string): void {
  if (!control) {
    return;
  }

  const currentErrors = control.errors ?? {};
  control.setErrors({ ...currentErrors, backend: message });
  control.markAsTouched();
}

export function mapBackendErrorsToForm(form: FormGroup, error: unknown): string[] {
  const globalErrors: string[] = [];

  if (!error || typeof error !== 'object') {
    return ['Ocurrió un error inesperado.'];
  }

  const payload = (error as { error?: unknown }).error;
  if (!payload || typeof payload !== 'object') {
    return ['No se pudo procesar la respuesta del servidor.'];
  }

  const data = payload as {
    message?: string;
    error?: string;
    detail?: string;
    errors?: Record<string, string | string[]>;
    fieldErrors?: FieldErrorEntry[];
    violations?: FieldErrorEntry[];
  };

  const applyFieldError = (field: string, message: string): void => {
    if (form.contains(field)) {
      addError(form.get(field), message);
      return;
    }

    globalErrors.push(`${field}: ${message}`);
  };

  if (data.errors) {
    Object.entries(data.errors).forEach(([field, value]) => {
      const message = Array.isArray(value) ? value.join(', ') : value;
      if (message) {
        applyFieldError(field, message);
      }
    });
  }

  const structuredErrors = [...(data.fieldErrors ?? []), ...(data.violations ?? [])];
  structuredErrors.forEach((entry) => {
    if (!entry.field || !entry.message) {
      return;
    }
    applyFieldError(entry.field, entry.message);
  });

  const message = data.message || data.detail || data.error;
  if (message) {
    globalErrors.push(message);
  }

  return [...new Set(globalErrors)];
}
