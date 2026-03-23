import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { nombreCompletoTecnico, TecnicoResponseDto } from '../models/tecnico.model';
import { TecnicosApiService } from '../services/tecnicos-api.service';

@Component({
  selector: 'app-tecnico-detail-page',
  standalone: true,
  imports: [RouterLink, PageHeaderComponent],
  templateUrl: './tecnico-detail-page.component.html',
  styleUrl: './tecnico-detail-page.component.scss'
})
export class TecnicoDetailPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly tecnicosApi = inject(TecnicosApiService);

  protected readonly loading = signal(true);
  protected readonly error = signal('');
  protected readonly tecnico = signal<TecnicoResponseDto | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.tecnicosApi.obtenerPorId(id).subscribe({
      next: (data) => {
        this.tecnico.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No fue posible cargar el detalle del técnico.');
        this.loading.set(false);
      }
    });
  }

  protected nombreCompleto(): string {
    const item = this.tecnico();
    if (!item) {
      return '-';
    }

    return nombreCompletoTecnico(item);
  }
}
