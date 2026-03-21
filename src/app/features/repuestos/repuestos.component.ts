import { Component } from '@angular/core';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'app-repuestos',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `<app-feature-placeholder [title]="title" [summary]="summary" [nextSteps]="nextSteps" />`
})
export class RepuestosComponent {
  readonly title = 'Repuestos';
  readonly summary = 'Control básico de repuestos utilizados por orden, sin manejo de stock en MVP.';
  readonly nextSteps = [
    'Asignar repuestos manuales a cada reparación.',
    'Registrar costo y precio de venta por repuesto.',
    'Listar consumo histórico para control interno.'
  ];
}
