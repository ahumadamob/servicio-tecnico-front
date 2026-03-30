import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { RepuestoCompatibilidadesComponent } from '../components/repuesto-compatibilidades.component';
import { RepuestoCatalogoResponseDto } from '../models/repuesto-catalogo.model';
import { RepuestosCatalogoApiService } from '../services/repuestos-catalogo-api.service';

@Component({
  selector: 'app-repuesto-catalogo-detail-page',
  standalone: true,
  imports: [RouterLink, PageHeaderComponent, RepuestoCompatibilidadesComponent],
  templateUrl: './repuesto-catalogo-detail-page.component.html'
})
export class RepuestoCatalogoDetailPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly repuestosApi = inject(RepuestosCatalogoApiService);

  protected readonly loading = signal(true);
  protected readonly error = signal('');
  protected readonly item = signal<RepuestoCatalogoResponseDto | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.repuestosApi.obtenerPorId(id).subscribe({
      next: (data) => {
        this.item.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No fue posible cargar el detalle del repuesto de catálogo.');
        this.loading.set(false);
      }
    });
  }
}
