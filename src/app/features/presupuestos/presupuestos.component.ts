import { Component } from '@angular/core';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'app-presupuestos',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `<app-feature-placeholder [title]="title" [summary]="summary" [nextSteps]="nextSteps" />`
})
export class PresupuestosComponent {
  readonly title = 'Presupuestos';
  readonly summary = 'Presupuesto obligatorio para cada orden antes de iniciar reparación.';
  readonly nextSteps = [
    'Crear emisión de presupuesto por mano de obra y repuestos.',
    'Registrar respuesta del cliente (aceptado/rechazado).',
    'Guardar fecha y canal de confirmación.'
  ];
}
