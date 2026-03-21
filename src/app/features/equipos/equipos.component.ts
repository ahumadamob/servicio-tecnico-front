import { Component } from '@angular/core';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'app-equipos',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `<app-feature-placeholder [title]="title" [summary]="summary" [nextSteps]="nextSteps" />`
})
export class EquiposComponent {
  readonly title = 'Equipos';
  readonly summary = 'Registro del equipo ingresado a servicio técnico y sus datos clave.';
  readonly nextSteps = [
    'Guardar marca, modelo, IMEI/serie y accesorios recibidos.',
    'Relacionar cada equipo con un cliente.',
    'Definir estado físico inicial con observaciones.'
  ];
}
