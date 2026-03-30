import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { TipoRepuestoResponseDto } from '../models/tipo-repuesto.model';
import { TiposRepuestoApiService } from '../services/tipos-repuesto-api.service';

@Component({
  selector: 'app-tipo-repuesto-detail-page',
  standalone: true,
  imports: [RouterLink, PageHeaderComponent],
  templateUrl: './tipo-repuesto-detail-page.component.html'
})
export class TipoRepuestoDetailPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly tiposApi = inject(TiposRepuestoApiService);

  protected readonly loading = signal(true);
  protected readonly error = signal('');
  protected readonly item = signal<TipoRepuestoResponseDto | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.tiposApi.obtenerPorId(id).subscribe({
      next: (data) => {
        this.item.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No fue posible cargar el detalle del tipo de repuesto.');
        this.loading.set(false);
      }
    });
  }
}
