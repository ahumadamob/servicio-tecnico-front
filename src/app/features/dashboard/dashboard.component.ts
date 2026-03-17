import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  readonly ordersByStatus = [
    { status: 'Recibidas', quantity: 42, badgeClass: 'text-bg-secondary' },
    { status: 'En diagnóstico', quantity: 18, badgeClass: 'text-bg-info' },
    { status: 'En reparación', quantity: 27, badgeClass: 'text-bg-warning' },
    { status: 'Finalizadas', quantity: 35, badgeClass: 'text-bg-success' }
  ];

  readonly pendingQuotes = [
    { order: 'OT-1042', client: 'ElectroSur S.A.', elapsed: '48 h' },
    { order: 'OT-1058', client: 'Logística MZ', elapsed: '36 h' },
    { order: 'OT-1061', client: 'Clínica Norte', elapsed: '24 h' }
  ];

  readonly readyForDelivery = [
    { order: 'OT-1031', equipment: 'Notebook Dell Latitude', client: 'Maderas del Sur' },
    { order: 'OT-1037', equipment: 'Impresora HP LaserJet', client: 'Estudio Benítez' },
    { order: 'OT-1045', equipment: 'PC All-in-One Lenovo', client: 'Distribuidora Belgrano' }
  ];
}
