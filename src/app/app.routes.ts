import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ClientesComponent } from './features/clientes/clientes.component';
import { EntregasComponent } from './features/entregas/entregas.component';
import { EquiposComponent } from './features/equipos/equipos.component';
import { OrdenesComponent } from './features/ordenes/ordenes.component';
import { PagosComponent } from './features/pagos/pagos.component';
import { PresupuestosComponent } from './features/presupuestos/presupuestos.component';
import { RepuestosComponent } from './features/repuestos/repuestos.component';
import { SeguimientoComponent } from './features/seguimiento/seguimiento.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'equipos', component: EquiposComponent },
      { path: 'ordenes', component: OrdenesComponent },
      { path: 'presupuestos', component: PresupuestosComponent },
      { path: 'repuestos', component: RepuestosComponent },
      { path: 'pagos', component: PagosComponent },
      { path: 'entregas', component: EntregasComponent },
      { path: 'seguimiento', component: SeguimientoComponent }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
