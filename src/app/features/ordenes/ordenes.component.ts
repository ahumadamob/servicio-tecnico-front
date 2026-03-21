import { Component } from '@angular/core';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'app-ordenes',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `<app-feature-placeholder [title]="title" [summary]="summary" [nextSteps]="nextSteps" />`
})
export class OrdenesComponent {
  readonly title = 'Órdenes';
  readonly summary = 'Gestión completa de órdenes de trabajo desde recepción hasta entrega.';
  readonly nextSteps = [
    'Crear flujo de estados interno para la orden.',
    'Registrar diagnóstico técnico y responsable.',
    'Bloquear avance a reparación sin presupuesto emitido.'
  ];
}
