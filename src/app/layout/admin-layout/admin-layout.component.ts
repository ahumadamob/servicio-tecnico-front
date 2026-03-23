import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  readonly navItems: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Clientes', path: '/clientes' },
    { label: 'Técnicos', path: '/tecnicos' },
    { label: 'Equipos', path: '/equipos' },
    { label: 'Órdenes', path: '/ordenes' },
    { label: 'Presupuestos', path: '/presupuestos' },
    { label: 'Repuestos', path: '/repuestos' },
    { label: 'Pagos', path: '/pagos' },
    { label: 'Entregas', path: '/entregas' },
    { label: 'Seguimiento', path: '/seguimiento' }
  ];
}
