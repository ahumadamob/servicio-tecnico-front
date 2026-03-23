import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ClienteCreatePageComponent } from './features/clientes/pages/cliente-create-page.component';
import { ClienteDetailPageComponent } from './features/clientes/pages/cliente-detail-page.component';
import { ClienteEditPageComponent } from './features/clientes/pages/cliente-edit-page.component';
import { ClientesListPageComponent } from './features/clientes/pages/clientes-list-page.component';
import { EntregasComponent } from './features/entregas/entregas.component';
import { EquiposComponent } from './features/equipos/equipos.component';
import { OrdenesComponent } from './features/ordenes/ordenes.component';
import { PagosComponent } from './features/pagos/pagos.component';
import { PresupuestosComponent } from './features/presupuestos/presupuestos.component';
import { RepuestosComponent } from './features/repuestos/repuestos.component';
import { SeguimientoComponent } from './features/seguimiento/seguimiento.component';
import { TecnicoCreatePageComponent } from './features/tecnicos/pages/tecnico-create-page.component';
import { TecnicoDetailPageComponent } from './features/tecnicos/pages/tecnico-detail-page.component';
import { TecnicoEditPageComponent } from './features/tecnicos/pages/tecnico-edit-page.component';
import { TecnicosListPageComponent } from './features/tecnicos/pages/tecnicos-list-page.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'clientes', component: ClientesListPageComponent },
      { path: 'clientes/nuevo', component: ClienteCreatePageComponent },
      { path: 'clientes/:id', component: ClienteDetailPageComponent },
      { path: 'clientes/:id/editar', component: ClienteEditPageComponent },
      { path: 'tecnicos', component: TecnicosListPageComponent },
      { path: 'tecnicos/nuevo', component: TecnicoCreatePageComponent },
      { path: 'tecnicos/:id', component: TecnicoDetailPageComponent },
      { path: 'tecnicos/:id/editar', component: TecnicoEditPageComponent },
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
