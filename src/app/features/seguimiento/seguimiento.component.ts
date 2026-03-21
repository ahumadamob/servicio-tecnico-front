import { Component } from '@angular/core';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'app-seguimiento',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `<app-feature-placeholder [title]="title" [summary]="summary" [nextSteps]="nextSteps" />`
})
export class SeguimientoComponent {
  readonly title = 'Seguimiento';
  readonly summary = 'Vista del estado de la reparación para consulta interna y del cliente.';
  readonly nextSteps = [
    'Exponer línea de tiempo de estados de la orden.',
    'Definir estados visibles para cliente final.',
    'Agregar búsqueda por número de orden o ticket.'
  ];
}
