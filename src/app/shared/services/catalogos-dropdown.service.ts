import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../core/config/api-base-url.token';
import { MarcaDropdownResponseDto, ModeloEquipoDropdownResponseDto } from '../models/dropdown.model';

@Injectable({ providedIn: 'root' })
export class CatalogosDropdownService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  listarMarcasActivas(): Observable<MarcaDropdownResponseDto[]> {
    return this.http.get<MarcaDropdownResponseDto[]>(`${this.apiBaseUrl}/api/marcas/dropdown`);
  }

  listarModelosActivosPorMarca(marcaId: number): Observable<ModeloEquipoDropdownResponseDto[]> {
    const params = new HttpParams().set('marcaId', marcaId);
    return this.http.get<ModeloEquipoDropdownResponseDto[]>(`${this.apiBaseUrl}/api/modelos/dropdown`, { params });
  }
}
