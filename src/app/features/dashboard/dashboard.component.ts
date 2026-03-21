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
    { status: 'Recibidas hoy', quantity: 6, badgeClass: 'text-bg-secondary' },
    { status: 'En diagnóstico', quantity: 4, badgeClass: 'text-bg-info' },
    { status: 'Esperando aprobación', quantity: 5, badgeClass: 'text-bg-warning' },
    { status: 'Listas para entregar', quantity: 3, badgeClass: 'text-bg-success' }
  ];

  readonly pendingQuotes = [
    { order: 'OT-1208', client: 'María G.', elapsed: '26 h' },
    { order: 'OT-1211', client: 'Sergio T.', elapsed: '18 h' },
    { order: 'OT-1214', client: 'Rocío L.', elapsed: '6 h' }
  ];

  readonly readyForDelivery = [
    { order: 'OT-1197', equipment: 'iPhone 11', client: 'Paula C.' },
    { order: 'OT-1201', equipment: 'Samsung A54', client: 'David M.' },
    { order: 'OT-1203', equipment: 'Moto G73', client: 'Karen R.' }
  ];
}
