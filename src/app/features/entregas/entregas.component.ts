import { Component } from '@angular/core';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'app-entregas',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `<app-feature-placeholder [title]="title" [summary]="summary" [nextSteps]="nextSteps" />`
})
export class EntregasComponent {
  readonly title = 'Entregas';
  readonly summary = 'Cierre de la orden con retiro del equipo y conformidad del cliente.';
  readonly nextSteps = [
    'Validar orden finalizada y saldo en cero antes de entregar.',
    'Registrar fecha de entrega y receptor.',
    'Emitir comprobante simple de retiro.'
  ];
}
