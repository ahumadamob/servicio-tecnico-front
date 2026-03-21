import { Component } from '@angular/core';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `<app-feature-placeholder [title]="title" [summary]="summary" [nextSteps]="nextSteps" />`
})
export class PagosComponent {
  readonly title = 'Pagos';
  readonly summary = 'Registro de cobros asociados a la orden y estado de cancelación.';
  readonly nextSteps = [
    'Permitir registrar pago parcial o total.',
    'Guardar método de pago y comprobante.',
    'Reflejar saldo pendiente en la orden.'
  ];
}
