import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../core/config/api-base-url.token';
import {
  OrdenesListQueryParams,
  PagedResponseDtoOrdenTrabajoListItemResponseDto
} from '../models/ordenes.model';

@Injectable({ providedIn: 'root' })
export class OrdenesApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);
  private readonly baseUrl = `${this.apiBaseUrl}/api/ordenes`;

  listar(params: OrdenesListQueryParams): Observable<PagedResponseDtoOrdenTrabajoListItemResponseDto> {
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('size', params.size)
      .set('sort', params.sort);

    if (params.busqueda) {
      httpParams = httpParams.set('busqueda', params.busqueda);
    }

    if (params.estado) {
      httpParams = httpParams.set('estado', params.estado);
    }

    if (params.tecnicoId !== undefined) {
      httpParams = httpParams.set('tecnicoId', params.tecnicoId);
    }

    if (params.fechaDesde) {
      httpParams = httpParams.set('fechaDesde', params.fechaDesde);
    }

    if (params.fechaHasta) {
      httpParams = httpParams.set('fechaHasta', params.fechaHasta);
    }

    return this.http.get<PagedResponseDtoOrdenTrabajoListItemResponseDto>(this.baseUrl, { params: httpParams });
  }
}
