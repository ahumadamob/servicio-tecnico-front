import { Component } from '@angular/core';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `<app-feature-placeholder [title]="title" [summary]="summary" [nextSteps]="nextSteps" />`
})
export class ClientesComponent {
  readonly title = 'Clientes';
  readonly summary = 'Administración de clientes del taller, con foco en historial y datos de contacto.';
  readonly nextSteps = [
    'Crear ABM de clientes con validaciones básicas.',
    'Agregar búsqueda por nombre, teléfono y documento.',
    'Mostrar historial de órdenes por cliente.'
  ];
}
